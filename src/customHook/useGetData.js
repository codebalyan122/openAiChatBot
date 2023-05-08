import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const getResponseFromAi = (prompt) => {
  if (prompt !== "") {
    return axios.post("http://localhost:5555/chat", { prompt });
  }
};

export const useGetData = ({ onSuccess, onError, onMutate }) => {
  return useMutation({
    mutationKey: ["getDataFromAi"],
    mutationFn: (prompt) => {
      return getResponseFromAi(prompt);
    },
    onMutate: onMutate,
    onSuccess: onSuccess,
    onError: onError,
    enabled: false,
  });
};
