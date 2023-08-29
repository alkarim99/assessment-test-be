const emailValidation = require("../email.validation")
const model = require("../models/candidate.models")

const get = async (req, res) => {
  try {
    const page = req.query.page
    if (page && isNaN(page)) {
      res.status(400).json({
        status: false,
        message: "Page must be integer",
      })
      return
    }
    const { total_data, total_page, current_page, results } = await model.get(
      page
    )
    res.json({
      status: true,
      message: "Get success",
      total_data,
      total_page,
      current_page,
      results,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: false,
      message: "Error in server",
    })
  }
}

const create = async (req, res) => {
  try {
    const {
      email,
      phone_number,
      full_name,
      dob,
      pob,
      gender,
      year_exp,
      last_salary,
    } = req.body
    if (
      !(
        email &&
        phone_number &&
        full_name &&
        dob &&
        pob &&
        gender &&
        year_exp &&
        last_salary
      )
    ) {
      res.status(400).json({
        status: false,
        message: "Bad input, please complete all of fields",
      })
      return
    }
    const { valid, reason, validators } = await emailValidation.isEmailValid(
      email
    )
    if (!valid) {
      res.status(400).json({
        status: false,
        message: "Email is invalid!",
        reason: validators[reason].reason,
      })
      return
    }
    const isEmailUnique = await emailValidation.isEmailUnique(email)
    if (isEmailUnique) {
      res.status(400).json({
        status: false,
        message: "Email already in use!",
      })
      return
    }
    if (full_name.length < 3) {
      res.status(400).json({
        status: false,
        message: "Fullname is invalid! Must be greater than or equal to 3",
      })
      return
    }
    if (phone_number.length < 11) {
      res.status(400).json({
        status: false,
        message: "Phone Number is invalid! Must be greater than or equal to 11",
      })
      return
    }
    const { message } = await model.create(req.body)
    // res.json(query)
    res.json({
      status: true,
      message,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: false,
      message: "Error in server",
    })
  }
}

module.exports = {
  get,
  create,
}
