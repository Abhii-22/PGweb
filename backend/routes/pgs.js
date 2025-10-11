const express = require('express');
const router = express.Router();
const { getPgs, createPg, updatePg, deletePg, getMyPgs } = require('../controllers/pgController');

router.route('/')
  .get(getPgs)
  .post(createPg);

router.route('/my-pgs').get(getMyPgs);

router.route('/:id')
  .put(updatePg)
  .delete(deletePg);

module.exports = router;
