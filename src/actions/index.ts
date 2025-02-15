import { getUsersEmail } from "./Users/get-user-email.action";
import { getUsers } from "./Users/get-users.action";
import { createUser, updateUser, deleteUser } from "./Users/user-crud.action";

export const server = {
  getUsers,
  getUsersEmail,
  createUser,
  updateUser,
  deleteUser,
  
};
