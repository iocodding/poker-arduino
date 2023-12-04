import { useQuery } from "@tanstack/vue-query";
import axios from "axios";

export const useVideoLoader = ({ id }) => {
  console.log({ id})
  const config = useRuntimeConfig();

  const state = useQuery({
    queryKey: ["video"],
    queryFn: () =>
      axios.call("get", `${config.public.API_BASE_URL}/api/videoS/${id}?populate=*`),
    select: (res) => {      
      return res.data.data
    }
  });

  return state;
};
