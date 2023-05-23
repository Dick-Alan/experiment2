import { api } from "~/utils/api";
import { useState } from "react";
const UsersBar = () => {
  const users = api.user.getAll.useQuery();
  const [viewUsers, setViewUsers] = useState(false);
  console.log(users.data);
  if (!users.data) return <div>no users</div>;
  return (
    <div className="justify-end bg-black p-2 text-lime-400">
      <button
        className="flex grid-cols-2 gap-2 rounded-md border border-lime-400 p-2  "
        onClick={() => setViewUsers(!viewUsers)}
      >
        <div> user list </div>

        <div className="font-mono">{viewUsers ? `[-]` : `[+]`}</div>
      </button>
      {viewUsers ? (
        <div className="absolute ml-5 rounded-md border border-lime-400 bg-black p-2">
          {users.data.map((e) => (
            <div key={e.id} className="flex grid-cols-2 gap-1 p-1">
              {" "}
              <img
                src={e.image || ""}
                className="h-[30px] w-[30px] rounded-full"
              />
              <div>{e.name}</div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UsersBar;
