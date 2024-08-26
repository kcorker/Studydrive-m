import useSWR from "swr";
import fetcher from "../fetcher";

const useVideo = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/video", fetcher);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};



export { useVideo };