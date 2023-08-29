require("dotenv").config()

const express = require("express")
const app = express()
const bodyParser = require("body-parser")

const candidateRoutes = require("./routes/candidate.routes")

const port = 3000

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// app.use(bodyParser.json())

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(candidateRoutes)

app.get("/", (req, res) => {
  res.send("API For Assessment Test!")
})

app.listen(port, () => {
  console.log(`Assessment Test app listening at http://localhost:${port}`)
})
