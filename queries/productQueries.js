export const selectProducts = async () => {
  try {
    const [result] = db.query("SELECT * FROM products");

    return result;
  } catch (error) {
    console.log(result);
    // incase of an error i'm return an empty array instead of true data
    return [];
  }
};
