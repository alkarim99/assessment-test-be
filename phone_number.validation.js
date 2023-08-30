const db = require("./database")

const isPhoneNumberUnique = async (number, id) => {
  try {
    let phone_numbers
    if (id) {
      phone_numbers = await db.query(
        `SELECT phone_number FROM t_candidate WHERE id != ${id}`
      )
    } else {
      phone_numbers = await db.query(`SELECT phone_number FROM t_candidate`)
    }
    const isPhoneNumberUnique = phone_numbers.find(
      (data) => data.phone_number === number
    )
    return isPhoneNumberUnique
  } catch (error) {
    return error
  }
}

module.exports = { isPhoneNumberUnique }
