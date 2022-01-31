const router = require('express').Router();
const helpers = require('../Helpers/Adminhelpers');

router.get('/', (req, res) => {
    helpers.getUsers().then((resp) => {
        res.json({ resp });
        console.log('fetching........Done!');
        
    })

})

module.exports = router;