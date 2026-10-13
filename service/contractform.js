const { db } = require("../config/db");
const contractformValidator = require("../validator/contractform");

const getAllUser = async () => {
  try {
    const { data, error } = await db
      .from(process.env.SUPABASE_TABLE_NAME)
      .select('*');

    if (error) {
      throw new Error(`Database Error: ${error.message}`);
    }

    return data;

  } catch (error) {
    throw error;
  }
};

const createUser = async (userData) => {
  try {
    // 1. Run validation
    await contractformValidator.userBody(userData);

    const { name, email, phone, message } = userData;

    // 2. Insert into Supabase
    const { data, error } = await db
      .from(process.env.SUPABASE_TABLE_NAME)
      .insert([{ name, email, phone, message: message || '' }])
      .select();

    if (error) {
      console.error('Insertion Error:', error.message);
      throw new Error(error.message);
    }

    console.log('User created:', data);
    return data;

  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    contractformValidator.userId({ id });

    const { data, error } = await db
      .from(process.env.SUPABASE_TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return 0;
      }
      throw new Error(`User ID find Error: ${error.message}`);
    }
    return data;

  } catch (error) {
    throw error;
  }
}

const updateUserById = async (id, userData) => {
  try {
    const { name, email, phone, message } = userData;

    //check the data
    contractformValidator.userId({ id });
    contractformValidator.userBodyUpdate(userData);

    const data = await getUserById(id);

    if (data === 0) {
      return "No User Found";
    }

    if (Object.keys(data).length === 0) {
      return "No User Found";
    }

    const updatedPayload = {
      name: name ?? data.name,
      email: email ?? data.email,
      phone: phone ?? data.phone,
      message: message ?? data.message,
    }

    const { data: updatedRecord, error } = await db
      .from(process.env.SUPABASE_TABLE_NAME)
      .update(updatedPayload)
      .eq("id", id)
      .select();

    if (error) {
      throw new Error(`Database Error: ${error.message}`);
    }
    return updatedRecord;

  } catch (error) {
    throw error;
  }
}

const deleteUserById = async (id) => {
  try {
    contractformValidator.userId({ id });

    const { data, error } = await db
      .from(process.env.SUPABASE_TABLE_NAME)
      .delete()
      .eq('id', id)
      .select()

    if (error) {
      throw new Error(`User ID delete Error: ${error.message}`);
    }

    console.log(data);

    return data;

  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllUser,
  createUser,
  updateUserById,
  getUserById,
  deleteUserById,
};
