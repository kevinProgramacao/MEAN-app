const dateFormat = require('dateformat');
const express = require('express');
const router = express.Router();
const Pub = require('../models/pub');
var day = Date();

//CRUD
//Insert
router.post('/insert', (req, res, next) => {
    let newPub = new Pub ({
      data: dateFormat(day, "dd/mm/yyyy"),
      titulo: req.body.titulo,
      texto: req.body.texto,
      slug: req.body.slug,
      autor: req.body.autor
    });
  
    Pub.addPub(newPub, (err, user) => {
      if(err) {
        res.json({success: false, msg: 'Failed to register publicação'});
      } else {
        res.json({success: true, msg: 'Publicação registered'});
      }
    });
  });

//SELECT * FROM
router.get('/select', (req, res, next) => {
  Pub.getPubs((err, pub) => {
    if(err) {
      res.json({success: false, msg: 'Failed to get pub'});
    } else {
      res.json({pub: pub})
    }
  })
})

//Select Where
router.get('/onePub/:slug', (req, res, next) => {
  let slug = req.params;
  Pub.getPubBySlug(slug.slug, (err, response) => {
    if(err) {
      res.json({success: false, msg: 'Failed'});
    } else {
      res.json({slug: response})
    }
  })
})

//Update
router.put('/update/:slug', (req, res, next) => {
  let slug = req.params;
  
  Pub.updatePub(slug, req.body, (err, update) => {
    if(err) {
      res.json({success: false, msg: 'Failed'});
    } else {
      res.json({success: true, msg: 'Success'});
    }
  })
})

router.delete('/delete/:id', (req, res, next) => {
  let id = req.params;

  Pub.removePub(id.id, (err, pub) => {
    if(err) {
      res.json({ success: false, msg: 'Failed to find pub'});
    } else {
      pub.remove((er, response) => {
        if(er) {
          res.json({ success: false, msg: 'Failed'});
        } else {
          res.json({ success: true, msg: 'Success' });
        }
      });
    }
  })
})

module.exports = router;