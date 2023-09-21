import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services";
// import { IUser } from "../../interfaces";

const TypeScript = () => {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <section
      style={{
        border: "1px solid",
        padding: "20px",
      }}
    >
      <p>Example for TypeScript</p>
      <h2>Users</h2>
      <ul>
        {users.slice(0, 10).map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </section>
  );
};

export default TypeScript;
