
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

/* BEGIN - create routes here */
app.get('/users', function(req, res){
  console.log('insinde GET /users');

  console.log("current users: ", users);

  res.json(users);
})

app.get('/users/1', function (req, res){
  console.log('inside /users/1 route');
  
  res.json(users[0]);
})

app.get("/users/:id", function(req, res){
  console.log("inside my GET /users/:id route", req.params);

  let currentId = req.params.id;

  let user = users.find(function(element){
    if (element._id == currentId){
      return element
    }
  })
  res.json(user)
})

let nextUserId = 1;
users.forEach(function(user){
  if(nextUserId <= user._id){
    nextUserId = user._id+1;
  }
})

app.post('/users', function (req, res){
  console.log('inside my POST /users route');
  console.log("request body: ", req.body);

  const newUser = {
    _id: counter,
    name: 'Cesar',
    occupation: 'Cook',
    avatar: 'some url'
  };
  users.push(newUser);
  counter++;
  res.json(users[users.length - 1])
})

app.put('/users/:id', function (req, res){
  const id = req.params.id;

  for(let i = 0; i<users.length; i++){
    let currentUser = users[i];
    let currentUserId = users[i]._id;
    if(currentUserId == id){
      const foundMember = currentUser;
      foundMember.name = req.body.name;
      foundMember.occupation = req.body.occupation;
      res.json({msg: 'member found and updated', foundMember})
    }
  }
  res.status(400).json({msg: 'No member with the id of ' + id})
})

app.delete('/users/:usersId', function(req, res){
  const id = req.params.usersId;

  for(let i = 0;i < users.length; i++){
    let currentUserId = users[i]._id;
    if(currentUserId == id){
      let foundUser = users.splice(i,1);
      foundUser[0].isActive = false;
      res.json({ msg: 'member found and deleted', foundUser, users })
    }
    res.status(400).json({msg: 'no member with id of ' + id})
  }
})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))