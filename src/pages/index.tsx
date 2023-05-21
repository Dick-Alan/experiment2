import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const { data, isLoading: postsLoading } = api.example.getAll.useQuery();
  console.log(typeof data);
  const user = useSession();
  console.log(user);
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          {user ? (
            `hello ${user.data?.user.name}`
          ) : (
            <button onClick={() => signIn()}> Sign In</button>
          )}
          <button onClick={() => signIn()}> Sign In</button>
          <button onClick={() => signOut()}> Sign Out</button>
          <br></br>
          {data
            ? data.map((e) => (
                <div
                  className="flex grid-cols-3 border bg-black text-lime-600"
                  key={e.id}
                >
                  <div className="border border-lime-600 px-1"> {e.id} </div>{" "}
                  <div className="border border-lime-600 px-1">
                    {" "}
                    {e.content}{" "}
                  </div>
                  <div className="border border-lime-600 px-1">
                    {" "}
                    {e.createdAt.toString()}{" "}
                  </div>
                </div>
              ))
            : ""}
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
