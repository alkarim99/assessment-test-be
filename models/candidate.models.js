const db = require("../database")
const helper = require("../helper")
const config = require("../config")

const get = async (page = 1) => {
  try {
    const offset = helper.getOffset(page, config.listPerPage)
    const results = await db.query(
      `SELECT * FROM t_candidate LIMIT ${offset},${config.listPerPage}`
    )
    const all = await db.query(`SELECT * FROM t_candidate`)
    const total_data = all.length
    const total_page = Math.ceil(total_data / config.listPerPage)
    return { total_data, total_page, current_page: page, results }
  } catch (error) {
    return error
  }
}

const getById = async (id) => {
  try {
    const results = await db.query(
      `SELECT * FROM t_candidate WHERE candidate_id=${id}`
    )
    return results
  } catch (error) {
    return error
  }
}

const create = async (candidate) => {
  try {
    const result = await db.query(
      `INSERT INTO t_candidate (email, phone_number, full_name, dob, pob, gender, year_exp, last_salary) VALUES ('${candidate.email}', '${candidate.phone_number}', '${candidate.full_name}', '${candidate.dob}', '${candidate.pob}', '${candidate.gender}', '${candidate.year_exp}', '${candidate.last_salary}');`
    )
    let message = "Error in creating candidate"
    if (result.affectedRows) {
      message = "Candidate created successfully"
    }
    return { message }
  } catch (error) {
    return error
  }
}

const update = async (candidate, id) => {
  try {
    const result = await db.query(
      `UPDATE t_candidate SET email='${candidate.email}', phone_number='${candidate.phone_number}', full_name='${candidate.full_name}', dob='${candidate.dob}', pob='${candidate.pob}', gender='${candidate.gender}', year_exp='${candidate.year_exp}', last_salary='${candidate.last_salary}' WHERE candidate_id='${id}'`
    )
    let message = "Error in updating candidate"
    if (result.affectedRows) {
      message = "Candidate updated successfully"
    }
    return { message }
  } catch (error) {
    return error
  }
}

const deleteCandidate = async (id) => {
  try {
    const result = await db.query(
      `DELETE FROM t_candidate WHERE candidate_id='${id}'`
    )
    let message = "Error in deleting candidate"
    if (result.affectedRows) {
      message = "Candidate deleted successfully"
    }
    return { message }
  } catch (error) {
    return error
  }
}

module.exports = {
  get,
  getById,
  create,
  update,
  deleteCandidate,
}
