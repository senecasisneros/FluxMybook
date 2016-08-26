'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/profile', User.authMiddleware, (req, res) => {
  res.send(req.user);
});

router.put('/profile', User.authMiddleware, (req, res) =>{
  User.findByIdAndUpdate(req.user._id, {$set: req.body}, {new: true}, (err, user)=>{
    if(err){
      return res.status(400).send(err);
    } else {
      return res.send(user)
    }
  })
})

router.get('/', (req, res) => {
  User.profile((err, users) => {
    res.status(err ? 400 : 200).send(err || users)
  })
})

router.post('/register', (req, res) => {
  User.register(req.body, err => {
    res.status(err ? 400 : 200).send(err);
  });
});

router.post('/login', (req, res) => {
  User.authenticate(req.body, (err, token) => {
    if(err) {
      res.status(400).send(err);
    } else {
      res.cookie('authtoken', token).send();
    }
  });
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if(err || !user) {
      return res.status(400).send(err || "User not found");
    }
    res.send(user)
  })
})

router.post('/logout', (req, res) => {
  res.clearCookie('authtoken').send();
});

module.exports = router;
