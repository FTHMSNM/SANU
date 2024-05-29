const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{

    console.log('showing home page')
    res.render('pages/admin', {layout: false});
})



  module.exports = router;