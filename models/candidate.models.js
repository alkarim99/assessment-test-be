const db = require("../database")
const helper = require("../helper")
const config = require("../config")
// const fs = require("fs")
// const mysql = require("mysql")

// config = {
//   multipleStatements: true,
//   connectionLimit: 1000,
//   connectTimeout: 60 * 60 * 1000,
//   acquireTimeout: 60 * 60 * 1000,
//   timeout: 60 * 60 * 1000,
//   host: "mysql-18e6a017-assessment-test-jobseeker.aivencloud.com",
//   user: "avnadmin",
//   password: "AVNS_4RY1Eh1K-FcEJSznZJi",
//   database: "defaultdb",
//   port: "10166",
//   ssl: {
//     ca: fs.readFileSync(__dirname + "../" + "/ca.pem"),
//   },
// }

// const pool = mysql.createPool(config)

// pool.on("error", (err) => {
//   console.error(err)
// })

const get = async (page = 1) => {
  try {
    const offset = helper.getOffset(page, config.listPerPage)
    const rows = await db.query(
      `SELECT email FROM t_candidate LIMIT ${offset},${config.listPerPage}`
    )
    // console.log(rows)
    const data = helper.emptyOrRows(rows)
    const meta = { page }

    return {
      data,
      meta,
    }
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
