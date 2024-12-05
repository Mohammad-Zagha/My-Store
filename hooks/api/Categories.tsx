import { axiosInstance } from '@/lib/Axios'
import { T_Category, T_Paginated_Response } from '@/types/objects'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'

export function useGetHomeCategories() {
   return useQuery({
      queryKey: ['home-categories'],
      queryFn: async () => {
         try {
            const { data } = await axiosInstance.get<T_Paginated_Response<T_Category>>('/categories')
            return data
         } catch (error) {
            console.log(error)
         }
      },
      placeholderData: keepPreviousData,
   })
}
