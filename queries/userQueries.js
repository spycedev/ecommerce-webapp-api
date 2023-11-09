import db from "../config/mysql";

export const selectUser = async (username, password) => {
  try {
    // the [] around result is so that we return index 0 as it contains the actual data we want
    const [result] = await db.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );

    return result[0];
    // [0] just mean return first result in array as we only expect one\
  } catch (error) {
    console.log(error);
    return null;
  }
};
