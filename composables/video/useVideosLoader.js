import { useQuery } from "@tanstack/vue-query";
import axios from "axios";

export const useVideosLoader = () => {
  const config = useRuntimeConfig();

  const state = useQuery({
    queryKey: ["videos"],
    queryFn: () =>
      axios.call("get", `${config.public.API_BASE_URL}/api/videos?populate=*`),
    select: (res) => {      
      return res.data.data
    }
  });

  return state;
};
