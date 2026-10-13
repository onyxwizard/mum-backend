const Validator = require("validatorjs");


const userBody = (userData) => {
  const rules = {
    name: 'required|string',
    email: 'required|email',
    phone: 'digits:10',
    message: 'sometimes|string|max:500'
  }

  const validation = new Validator(userData, rules);

  if (validation.fails()) {
    const errorData = validation.errors.all();
    const firstErrorData = validation.errors.first(Object.keys(errorData)[0]);
    throw new Error(`Validator Error : ${firstErrorData}`);
  }

}

const userBodyUpdate = (userData) => {
  const rules = {
    name: 'sometimes|string',
    email: 'sometimes|email',
    phone: 'sometimes|digits:10',
    message: 'sometimes|string|max:500'
  }

  const validation = new Validator(userData, rules);

  if (validation.fails()) {
    const errorData = validation.errors.all();
    const firstErrorData = validation.errors.first(Object.keys(errorData)[0]);
    throw new Error(`Validator Error : ${firstErrorData}`);
  }

}


const userId = (id) => {
  const rules = {
    id: "required|integer|min:1"
  }

  const validation = new Validator(id, rules);
  if (validation.fails()) {
    const errorData = validation.errors.add();
    const firstErrorData = validation.errors.first(Object.keys(errorData)[0]);
    throw new Error(`Validator Error : ${firstErrorData}`)
  }

}

module.exports = {
  userBody,
  userId,
  userBodyUpdate,
}