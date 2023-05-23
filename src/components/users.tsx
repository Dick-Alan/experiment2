import { api } from "~/utils/api";

const UsersBar = () => {
  const users = api.user.getAll.useQuery();

  console.log(users.data);
  if (!users.data) return <div>no users</div>;
  return (
    <div className="border border-lime-400 bg-black p-2 text-lime-400">
      Users:
      {users.data.map((e) => (
        <div key={e.id} className="flex grid-cols-2 gap-1 p-1">
          {" "}
          <img src={e.image || ""} className="h-[30px] w-[30px] rounded-full" />
          <div>{e.name}</div>
        </div>
      ))}
    </div>
  );
};

export default UsersBar;
