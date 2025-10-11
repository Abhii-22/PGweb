const express = require('express');
const router = express.Router();
const { getTenants, createTenant } = require('../controllers/tenantController');

router.route('/')
  .get(getTenants)
  .post(createTenant);

module.exports = router;
