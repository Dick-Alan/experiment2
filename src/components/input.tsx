import { useState } from "react";
import { api } from "~/utils/api";
import toast from "react-hot-toast";

import { useContext } from "react";
const InputBar = () => {
  const [input, setInput] = useState("");
  const ctx = api.useContext();
  const { mutate, isLoading: isPosting } = api.post.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.post.getAll.invalidate();
      toast.success("post successfull");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to post");
      }
    },
  });
  return (
    <div className="flex grid-cols-2">
      <div className="flex w-full ">
        <input
          className=" z-10 m-1 mb-5  h-[50px] w-[200px] grow rounded-sm bg-gray-900 bg-opacity-50 p-1 text-lime-400 outline-none"
          placeholder="Type message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isPosting}
        />

        <div>
          {input !== "" && !isPosting && (
            <div>
              <button
                className="my-2 rounded-md bg-slate-800 px-3 text-slate-300 hover:border hover:bg-lime-400"
                onClick={() => mutate({ content: input })}
              >
                SEND
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default InputBar;
