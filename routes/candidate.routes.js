const router = require("express").Router()
const candidateController = require("../controllers/candidate.controller")

router.get("/candidate", candidateController.get)

module.exports = router
