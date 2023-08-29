const mysql = require("mysql2")
const config = require("./config")

const query = (sql, params) => {
  const connection = mysql.createConnection(config.db)
  const results = connection.execute(sql, params)
  console.log(results)
  return results
}

module.exports = {
  query,
}
