const router = require("express").Router()
const candidateController = require("../controllers/candidate.controller")

router.get("/candidate", candidateController.get)
router.post("/candidate", candidateController.create)

module.exports = router
