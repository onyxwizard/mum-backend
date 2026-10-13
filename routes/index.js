// main route file
const router = require("express");
const mainRoute = router.Router();
const { contractform } = require("./contactform");


mainRoute.use("/form", contractform);
mainRoute.get('/', (req, res) => {
  return res.json("Main API page")
});


module.exports = {
  mainRoute
}