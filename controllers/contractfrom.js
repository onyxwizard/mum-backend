const contractformService = require("../service/contractform");

const getAllUser = async (req, res) => {
  try {
    const data = await contractformService.getAllUser();
    return res.status(200).json({ data: data });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: `Issue fetching users ${e.message}` });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await contractformService.getUserById(id);
    if (data === 0 || !data) {
      return res.status(404).json({ message: "No user found with this ID" });
    }

    return res.status(200).json({ data: data });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: `Issue Finding users ${e.message}` });
  }
}

const createUser = async (req, res) => {
  try {
    const userData = req.body;

    const data = await contractformService.createUser(userData);
    return res.status(201).json({ data: data });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: `Issue Creating users ${e.message}` });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    const data = await contractformService.updateUserById(id, userData);
    return res.status(200).json({ data: data });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: `Issue updating user ${e.message}` });
  }
}

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await contractformService.deleteUserById(id);

    if (data === 0 || !data) {
      return res.status(404).json({ message: "No user found with this ID to delete" });
    }

    return res.status(200).json({ data: data });

  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: `Issue deleting user: ${e.message}` });
  }
};


module.exports = {
  getAllUser,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
