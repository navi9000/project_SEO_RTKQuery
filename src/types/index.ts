export interface Category {
    id: number
    name: string
}

export interface Item {
    id: number
    name: string
    categoryId: number
    price: number
    urlSnippet: string
    archived: boolean
}

export interface SuccessfulApiResponse<T extends any> {
    is_success: true
    data: T
}

export interface FaultyApiResponse {
    is_success: false
    message: string
}

export type ApiResponse<T extends {}> = SuccessfulApiResponse<T> | FaultyApiResponse