import { useMutation, useQueryClient } from "@tanstack/vue-query";
import axios from "axios";


export function useVideoActions() {
  const queryClient = useQueryClient()
  const loading = ref(false);
  const config = useRuntimeConfig();

  return {
    loading,
    createVideo(video) {
      loading.value = true
      const promise = axios.post(`${config.public.API_BASE_URL}/api/videos`, { data: video }).then(() => {
        queryClient.invalidateQueries({ queryKey: ['videos'] })
      }).finally(() => {
        loading.value = false
      })
      return promise;
    },
    updateVideo(video) {
      loading.value = true
      const promise = axios.put(`${config.public.API_BASE_URL}/api/videos/${video.id}`, { data: video }).then(() => {
        queryClient.invalidateQueries({ queryKey: ['videos'] })
        queryClient.invalidateQueries({ queryKey: ['video'] })
      }).finally(() => {
        loading.value = false
      })
      return promise;
    },
    deleteComponent(component) {
      const promise = axios.delete(`${config.public.API_BASE_URL}/api/components/${component.id}`).then(() => {
        queryClient.invalidateQueries({ queryKey: ['components'] })
      })
      return promise;
    },
  
  };
}
