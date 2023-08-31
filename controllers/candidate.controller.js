const emailValidation = require("../email.validation")
const phoneNumberValidation = require("../phone_number.validation")
const model = require("../models/candidate.models")

const get = async (req, res) => {
  try {
    const { page, filter } = req.query
    if (page && isNaN(page)) {
      res.status(400).json({
        status: false,
        message: "Page must be integer",
      })
      return
    }
    const { total_data, total_page, current_page, results } = await model.get(
      page,
      filter?.toLowerCase()
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

const getById = async (req, res) => {
  try {
    const id = req.params.id
    if (isNaN(id)) {
      res.status(400).json({
        status: false,
        message: "ID must be integer",
      })
      return
    }
    const result = await model.getById(id)
    if (!result?.length) {
      res.status(400).json({
        status: false,
        message: `ID ${id} not found!`,
      })
    }
    res.json({
      status: true,
      result,
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
    const isPhoneNumberUnique = await phoneNumberValidation.isPhoneNumberUnique(
      phone_number
    )
    if (isPhoneNumberUnique) {
      res.status(400).json({
        status: false,
        message: "Phone number already in use!",
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

const update = async (req, res) => {
  try {
    const id = req.params.id
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
    if (isNaN(id)) {
      res.status(400).json({
        status: false,
        message: "ID must be integer",
      })
      return
    }
    const checkData = await model.getById(id)
    if (!checkData?.length) {
      res.status(400).json({
        status: false,
        message: `ID ${id} not found!`,
      })
    }
    let submitDate
    if (checkData[0].dob.toLocaleDateString()) {
      const date = checkData[0].dob.toLocaleDateString()
      const splitDate = date.split("/")
      submitDate = splitDate[2] + "-" + splitDate[0] + "-" + splitDate[1]
    }
    const payload = {
      email: email ?? checkData[0].email,
      phone_number: phone_number ?? checkData[0].phone_number,
      full_name: full_name ?? checkData[0].full_name,
      dob: dob ?? submitDate,
      pob: pob ?? checkData[0].pob,
      gender: gender ?? checkData[0].gender,
      year_exp: year_exp ?? checkData[0].year_exp,
      last_salary: last_salary ?? checkData[0].last_salary,
    }
    const { valid, reason, validators } = await emailValidation.isEmailValid(
      payload.email
    )
    if (!valid) {
      res.status(400).json({
        status: false,
        message: "Email is invalid!",
        reason: validators[reason].reason,
      })
      return
    }
    const isEmailUnique = await emailValidation.isEmailUnique(
      payload.email,
      checkData[0].candidate_id
    )
    if (isEmailUnique) {
      res.status(400).json({
        status: false,
        message: "Email already in use!",
      })
      return
    }
    if (payload.full_name.length < 3) {
      res.status(400).json({
        status: false,
        message: "Fullname is invalid! Must be greater than or equal to 3",
      })
      return
    }
    const isPhoneNumberUnique = await phoneNumberValidation.isPhoneNumberUnique(
      payload.phone_number,
      checkData[0].candidate_id
    )
    if (isPhoneNumberUnique) {
      res.status(400).json({
        status: false,
        message: "Phone number already in use!",
      })
      return
    }
    if (payload.phone_number.length < 11) {
      res.status(400).json({
        status: false,
        message: "Phone Number is invalid! Must be greater than or equal to 11",
      })
      return
    }
    const { message } = await model.update(payload, id)
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

const deleteCandidate = async (req, res) => {
  try {
    const id = req.params.id
    if (isNaN(id)) {
      res.status(400).json({
        status: false,
        message: "ID must be integer",
      })
      return
    }
    const checkData = await model.getById(id)
    if (!checkData?.length) {
      res.status(400).json({
        status: false,
        message: `ID ${id} not found!`,
      })
    }
    const { message } = await model.deleteCandidate(id)
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
  getById,
  create,
  update,
  deleteCandidate,
}
