const router = require('express').Router();
const helpers = require('../Helpers/Adminhelpers');

router.post('/',(req,res)=>{
    helpers.updateuser(req.body).then((resp)=>{
        res.json({resp})
})

})
module.exports = router;