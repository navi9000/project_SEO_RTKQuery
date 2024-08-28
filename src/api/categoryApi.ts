import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SERVER_URL } from '../app/consts'
import { ApiResponse, Category } from '../types'

export const categoryApi = createApi({
    reducerPath: 'categoryApiReducer',
    baseQuery: fetchBaseQuery({
        baseUrl: SERVER_URL
    }),
    endpoints: builder => ({
        getCategories: builder.query<Category[], void>({
            query: () => ({
                url: "/categories"
            }),
            keepUnusedDataFor: 24 * 60 * 60,
            transformResponse: (returnValue: ApiResponse<Category[]>) => {
                if ("data" in returnValue) {
                    return returnValue.data.map(item => ({ id: item.id, name: item.name }))
                }
                console.error(returnValue.message)
                return []
            }
        })
    })
})

export const categoryApiReducer = categoryApi.reducer
export const categoryApiMiddleware = categoryApi.middleware

export const {
    useGetCategoriesQuery,
    useLazyGetCategoriesQuery
} = categoryApi