const express = require("express");
const {ipa, lo} = require('../controllers/waController');
const router = express.Router()
router.get("/login",lo)
router.post("/api",ipa)
// router.get("/login",login)
module.exports = router;
