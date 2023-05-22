import { api } from "~/utils/api";
import { useEffect, useRef } from "react";
const GetUserName = (props: { id: string }) => {
  const id = props.id;
  const user = api.user.getById.useQuery({ id });
  console.log(user);
  if (!user.data) return null;

  return (
    <div className="flex grid-cols-2 gap-1">
      <img
        src={user.data.image || ""}
        className="h-[26px] w-[26px] rounded-full"
      ></img>
      <div className="text-sm">{user.data.name}</div>
    </div>
  );
};
const ChatView = (props: { userId: string }) => {
  const ctx = api.useContext();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const { data } = api.post.getAll.useQuery();
  const users = api.user.getAll.useQuery();
  const currentUser = props.userId;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  return (
    <div className=" mt-10 flex max-h-[300px] w-3/4 grid-cols-2  flex-col overflow-y-scroll rounded-md bg-black p-4 text-lime-400">
      {data?.map((e) =>
        e.authorId === props.userId ? (
          <div className="flex justify-end" key={e.id}>
            <div className="flex-col">
              <div className="flex justify-end">
                <GetUserName id={e.authorId}></GetUserName>
              </div>
              <div className=" m-1 rounded-md border p-2"> {e.content} </div>
            </div>
          </div>
        ) : (
          <div className="flex" key={e.id}>
            <div className="flex-col">
              <div className="flex">
                <GetUserName id={e.authorId}></GetUserName>
              </div>
              <div className="m-1 rounded-md border bg-gray-900 p-1 p-2">
                {" "}
                {e.content}{" "}
              </div>
            </div>
          </div>
        )
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
export default ChatView;
