const router = require('express').Router();
const helpers = require('../Helpers/Adminhelpers');


router.get('/:search',async(req,res)=>{
    console.log("Vannu....");
    const search =req.params.search
    console.log(search);
    const data=await helpers.searchUser(search).then((users)=>{
    const k = res.json({users})
    
   })

})

  
module.exports = router