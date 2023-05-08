import logo from "./logo.svg";
import "./App.css";
import GptIcon from "./GptIcon.png";
import chatIcon from "./chatIcon.webp";
import Images from "./Components/Images";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useGetData } from "./customHook/useGetData";
import { LinearProgress } from "@mui/material";

// const queryFunction = (prompt) => {
//   return axios.post("http://localhost:5555/chat", { prompt });
// };

function App() {
  const [prompt, setPrompt] = useState("");
  // const [response, setResponse] = useState("");
  // const [isLoading, setIsloading] = useState(false);

  // const HandleSubmit = (e) => {
  //   e.preventDefault();
  //   setIsloading(true);
  //   axios
  //     .post("http://localhost:5555/chat", { prompt })
  //     .then((res) => setResponse(res.data));
  //   setIsloading(false);
  //   setPrompt("");
  // };
  const { data, isLoading, isError, error, mutate } = useGetData({
    onSuccess: (resp) => {
      console.log(resp);
    },
    onError: (error) => {
      console.log(error);
    },
    onMutation: () => {
      console.log("mutation done");
    },
  });
  const HandleSubmit = (e) => {
    e.preventDefault();
    mutate(prompt);
    setPrompt("");
  };

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <>
      <div className="flex justify-center items-center  pt-14   mb-2">
        <Images image={chatIcon} name="ChatIcon" />
      </div>
      <form onSubmit={HandleSubmit}>
        <div className=" flex  justify-center p-20  ">
          <Images image={GptIcon} name="GptIcon" />

          <input
            className=" flex-1 max-w-2xl  outline-none"
            type="text"
            placeholder="Ask Anything..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            type="submit"
            className=" shadow-md bg-green-600 rounded outline-none   text-white"
          >
            Ask Anything
          </button>
        </div>
        <p className="text-white  text-center  ">{data?.data}</p>
      </form>
    </>
  );
}

export default App;
