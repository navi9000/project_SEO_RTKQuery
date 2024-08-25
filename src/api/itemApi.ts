import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SERVER_URL } from '../app/consts'
import { ApiResponse, Item } from '../types'

export const itemApi = createApi({
    reducerPath: 'itemApiReducer',
    baseQuery: fetchBaseQuery({
        baseUrl: SERVER_URL
    }),
    tagTypes: ['Item'],
    endpoints: builder => ({
        getItems: builder.query<Item[], { archived: boolean }>({
            query: (params) => ({
                url: '/items',
                params
            }),
            transformResponse: (returnValue: ApiResponse<Item[]>) => {
                if ('data' in returnValue) {
                    return returnValue.data
                }
                console.error(returnValue.message)
                return []
            },
            providesTags: ['Item'],
        }),
        createItem: builder.mutation<Item | null, any>({
            query: (body) => ({
                url: '/items',
                method: 'POST',
                body

            }),
            transformResponse: (returnValue: ApiResponse<Item>) => {
                if ('data' in returnValue) {
                    return returnValue.data
                }
                console.error(returnValue.message)
                return null
            },
            invalidatesTags: ['Item']
        }),
        updateItem: builder.mutation<Item | null, Partial<Item>>({
            query: ({ id, ...body }) => ({
                url: `/items/${id}`,
                method: "PUT",
                body
            }),
            transformResponse: (returnValue: ApiResponse<Item>) => {
                if ('data' in returnValue) {
                    return returnValue.data
                }
                console.error(returnValue.message)
                return null
            },
            invalidatesTags: ['Item'],
            async onQueryStarted({ id, archived = false }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    itemApi.util.updateQueryData("getItems", { archived: !archived }, (draft) => {
                        return draft.filter(item => item.id !== id)
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            }
        })
    })
})

export const itemApiReducer = itemApi.reducer
export const itemApiMiddleware = itemApi.middleware

export const {
    useGetItemsQuery,
    useCreateItemMutation,
    useUpdateItemMutation
} = itemApi