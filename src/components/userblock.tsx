import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import LogInPage from "./login";

const UserBlock = () => {
  const user = useSession();

  if (!user.data) {
    return <LogInPage />;
  } else {
    return (
      <div className="flex flex-col  rounded-sm border border-lime-400 bg-black p-1 text-lime-400">
        Logged in as:
        <div className="m-1 flex grid-cols-2 p-1">
          <img
            src={user.data?.user.image || ""}
            className="h-[30px] w-[30px]"
          ></img>
          <div>{user.data?.user.name}</div>
        </div>
        <button
          className="m-1 rounded-sm border px-1"
          onClick={() => void signOut()}
        >
          Log Out
        </button>
      </div>
    );
  }
};

export default UserBlock;
