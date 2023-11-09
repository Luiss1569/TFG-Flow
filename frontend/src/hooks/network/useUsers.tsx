import { useState } from "react";
import UserService, { IUser } from "../../services/UserService";

export function useUser() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);

  const userService = new UserService();

  const getAllUsers = async () => {
    setLoading(true);

    try {
      const response = await userService.getUsers();
      setUsers(response);
    } catch (error) {
      console.log("Erro ao buscar dados de usuários");
    } finally {
      setLoading(false);
    }
  };

  // const postAllUsers = async () => {
  //   setLoading(true);

  //   try {

  //   } catch (error) {

  //   }
  //}

  return {
    users,
    loading,
    getAllUsers,
  };
}
