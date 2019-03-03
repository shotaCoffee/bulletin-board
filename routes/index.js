'use strict';
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  connection.query('SELECT * FROM posts;', (err, results, fields)=> {
    if(err)
      return next(new Error());
    else
      return res.render('index', {'posts': results})
  })
});

router.post('/post', (req, res, next) => {
  if ( !req.body.text )
    return next(new Error());
  else
    connection.query('INSERT INTO posts(text, name) values (?,?)',
      [req.body.text, req.body.name], (err, results, fields) => {
        if ( err )
          return next(new Error());
        else if ( results )
          return res.redirect('/');
        else
          return next(new Error())
      })
});

module.exports = router;

