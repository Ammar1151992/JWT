const express = require('express');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const app = express();
app.use(express.json());

const users = [
    {
        username: "ammar",
        title: "Engineer"
    },
    {
      username: "yasser",
      title: "Engineer"
  }
]

app.get('/login', authentication, (req, res) => {
  res.json(users.filter(user => user.username === req.user.name)); 
});


app.post('/login', (req, res) => {
  const username = req.body.username;
  const user = { name: username }

  const access = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  console.log('Generated Token:', access);
  res.json({access:access})
});

function authentication(req, res, next) {
const authHeader = req.headers['authorization'];

const token = authHeader && authHeader.split(' ')[1];
if(token == null) return res.sendStatus(401);


  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error('Token verification failed:', err);
      return res.sendStatus(403);
    }

    console.log('Token verification successful. User:', user);
    req.user = user;
    next();
  });
}



app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});