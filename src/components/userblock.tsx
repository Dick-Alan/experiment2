import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const UserBlock = () => {
  const user = useSession();

  if (!user.data) {
    return (
      <div className="flex flex-col rounded-sm border border-lime-400 bg-black text-lime-400">
        <div className="m-2">Not logged in!</div>
      </div>
    );
  } else {
    return (
      <div className="b  flex grid-cols-3 rounded-sm bg-black p-1 text-lime-400">
        <div className=" flex grid-cols-2 p-1">
          <img
            src={user.data?.user.image || ""}
            className="h-[30px] w-[30px] rounded-full"
          ></img>
          <div>{user.data?.user.name}</div>
        </div>
        <button
          className="m-1 rounded-md  border border-lime-400 px-1"
          onClick={() => void signOut()}
        >
          Log Out
        </button>
      </div>
    );
  }
};

export default UserBlock;
