// Contract route file
const contractform = require("express").Router();
const contractformController = require("../controllers/contractfrom");

contractform.route('/')
  .get(contractformController.getAllUser);

contractform.route('/create')
  .post(contractformController.createUser);

contractform.route('/:id')
  .get(contractformController.getUserById)
  .put(contractformController.updateUserById)
  .delete(contractformController.deleteUserById);

module.exports = {
  contractform,
}
