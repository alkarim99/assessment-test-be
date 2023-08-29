// const db = require("../database")
const model = require("../models/candidate.models")

const get = async (req, res) => {
  try {
    const query = await model.get(req.query.page)
    res.json(query)
    console.log(query)
  } catch (error) {
    console.log(error)
  }
}

const create = async (req, res) => {
  try {
    const query = await model.create(req.body)
    res.json(query)
    console.log(query)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  get,
  create,
}
