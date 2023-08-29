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

async function create(candidate) {
  const result = await db.query(
    `INSERT INTO t_candidate (email, phone_number, full_name, dob, pob, gender, year_exp, last_salary) VALUES ('${candidate.email}', '${candidate.phone_number}', '${candidate.full_name}', '${candidate.dob}', '${candidate.pob}', '${candidate.gender}', '${candidate.year_exp}', '${candidate.last_salary}');`
  )

  let message = "Error in creating candidate"

  if (result.affectedRows) {
    message = "Candidate created successfully"
  }

  return { message }
}

module.exports = {
  get,
  create,
}
