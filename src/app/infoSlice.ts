import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SERVER_URL } from "./consts"

type Language = "en" | "ru"
type Theme = "light" | "dark"

type User = {
    id: number
    name: string
    role: {
        id: number
        name: number
    }
}

type InfoState = {
    lang: Language
    theme: Theme,
    user: User | null,
    userDataLoadingState: "idle" | "pending" | "succeeded" | "failed"
    currentRequestId: string | undefined
}

const initialState: InfoState = {
    lang: "ru",
    theme: "light",
    user: null,
    userDataLoadingState: "idle",
    currentRequestId: undefined
}

export const fetchUserData = createAsyncThunk<
    User | undefined,
    number,
    {
        state: {
            infoReducer: InfoState
        }
    }
>('info/fetchUserData', async (userId: number, { getState, requestId, rejectWithValue }) => {
    const { currentRequestId, userDataLoadingState } = getState().infoReducer

    if (userDataLoadingState !== 'pending' || requestId !== currentRequestId) {
        return
    }

    let result: User | null = null

    try {
        const userResponse = await fetch(SERVER_URL.concat("/users/", userId.toString()))
        const userData = await userResponse.json()
        if (userData.is_success) {
            const roleId = userData.data.role_id
            const roleResponse = await fetch(SERVER_URL.concat("/roles/", roleId.toString()))
            const roleData = await roleResponse.json()

            if (roleData.is_success) {
                result = {
                    id: userData.data.id,
                    name: userData.data.name,
                    role: {
                        id: roleData.data.id,
                        name: roleData.data.name
                    }
                }
            }
        }
    } catch {
        console.error('Failed to fetch user data')
    } finally {
        if (result) {
            return result
        }
        return rejectWithValue(null)

    }
})

const infoSlice = createSlice({
    name: "info",
    initialState,
    reducers: {
        setLanguage(state, action: PayloadAction<Language>) {
            state.lang = action.payload
        },
        setTheme(state, action: PayloadAction<Theme>) {
            state.theme = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUserData.pending, (state, { meta: { requestId } }) => {
                if (state.userDataLoadingState === "idle") {
                    state.userDataLoadingState = "pending"
                    state.currentRequestId = requestId
                }
            })
            .addCase(fetchUserData.fulfilled, (state, { meta: { requestId }, payload }) => {
                if (state.userDataLoadingState === "pending" && state.currentRequestId === requestId && payload) {
                    state.userDataLoadingState = "succeeded"
                    state.currentRequestId = undefined
                    state.user = payload
                }
            })
            .addCase(fetchUserData.rejected, (state, { meta: { requestId } }) => {
                if (state.userDataLoadingState === "pending" && state.currentRequestId === requestId) {
                    state.userDataLoadingState = "failed"
                    state.currentRequestId = undefined
                }
            })
    }
})

export const { setLanguage, setTheme } = infoSlice.actions
export const infoReducer = infoSlice.reducer