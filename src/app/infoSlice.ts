import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type Language = "en" | "ru"
type Theme = "light" | "dark"

type InfoState = {
    lang: Language
    theme: Theme
}

const initialState: InfoState = {
    lang: "ru",
    theme: "light"
}

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
    }
})

export const { setLanguage, setTheme } = infoSlice.actions
export const infoReducer = infoSlice.reducer