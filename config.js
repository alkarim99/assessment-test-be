// const fs = require("fs")
// const mysql = require("mysql2")

const config = {
  db: {
    // host: "mysql-18e6a017-assessment-test-jobseeker.aivencloud.com",
    // user: "avnadmin",
    // password: "AVNS_4RY1Eh1K-FcEJSznZJi",
    // database: "defaultdb",
    // port: "10166",
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    // connectTimeout: 60000,
  },
  listPerPage: 10,
}

// const pool = mysql.createPool(config)

// pool.on("error", (err) => {
//   console.error(err)
// })

module.exports = config
