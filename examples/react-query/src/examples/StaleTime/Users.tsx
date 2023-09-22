import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services";

const Users = () => {
  const { isLoading, data: users } = useQuery(["users"], {
    queryFn: getUsers,
    cacheTime: 1000 * 60,
  });

  if (isLoading) return <p>Loading...</p>;

  return <p>Data: {JSON.stringify(users)}</p>;
};

export default Users;
