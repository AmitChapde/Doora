import User from "../models/user.model";

const getAllUsers = async () => {
  return await User.find().select("_id name email");
};

const getUserById = async (id: string) => {
  return await User.findById(id).select("id name email");
};

export { getAllUsers, getUserById };
