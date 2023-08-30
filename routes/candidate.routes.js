const router = require("express").Router()
const candidateController = require("../controllers/candidate.controller")

router.get("/candidate/:id", candidateController.getById)
router.get("/candidate", candidateController.get)
router.post("/candidate", candidateController.create)
router.patch("/candidate/:id", candidateController.update)
router.delete("/candidate/:id", candidateController.deleteCandidate)

module.exports = router
