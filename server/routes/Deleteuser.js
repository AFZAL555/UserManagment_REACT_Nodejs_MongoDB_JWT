const router = require('express').Router();
const  deleteUser = require('../Helpers/delete');


router.delete('/:id', deleteUser);
  
module.exports = router