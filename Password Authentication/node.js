const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require("./key.json");
const bcrypt = require("bcrypt");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/signup", async function (req, res) {
  const { signUpEmail, signUpPassword } = req.body;

  try {
    
    const snapshot = await db.collection('mydata')
      .where('Email', '==', signUpEmail)
      .get();

    if (!snapshot.empty) {
      res.send("This email is already registered. Please <a href='/'>log in</a>.");
    } else {
      
      const hashedPassword = await bcrypt.hash(signUpPassword, 10);

      await db.collection('mydata').add({
        Email: signUpEmail,
        Password: hashedPassword, 
      });

      res.send("You Signed up Successfully with " + signUpEmail + ". <a href='/'>Click here to go to the login page</a>");
    }
  } catch (error) {
    console.error("Error storing data:", error);
    res.status(500).send("Error storing data.");
  }
});

app.post('/login', async function (req, res) {
  const { loginEmail, loginPassword } = req.body;

  try {
    const snapshot = await db.collection('mydata')
      .where('Email', '==', loginEmail)
      .get();

    if (!snapshot.empty) {
      const userData = snapshot.docs[0].data();
      const hashedPassword = userData.Password;

      const passwordMatch = await bcrypt.compare(loginPassword, hashedPassword);

      if (passwordMatch) {
        res.sendFile(__dirname + "/webpage.html");
      } else {
        res.send("Incorrect password. Please try again.");
      }
    } else {
      res.send("Data not present in Firebase, please login");
    }
  } catch (error) {
    console.error("Error querying data:", error);
    res.status(500).send("Error querying data.");
  }
});

const port = 2000;
app.listen(port, function () {
  console.log("Server started on port", port);
});
