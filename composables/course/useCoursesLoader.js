import { useQuery } from "@tanstack/vue-query";
import axios from "axios";

export const useCoursesLoader = () => {
  const config = useRuntimeConfig();

  const state = useQuery({
    queryKey: ["courses"],
    queryFn: () =>
      axios.call("get", `${config.public.API_BASE_URL}/api/courses?populate=*`),
    select: (res) => {      
      return res.data.data
    }
  });

  return state;
};
