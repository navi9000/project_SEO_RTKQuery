"use client"

import { ADD_PARAM } from "@/utils/consts"
import { useState, useEffect, createContext, useContext, ReactNode } from "react"

type CartContextType = {
    cartItemIds: number[]
    addItem: (id: number) => void
    removeItem: (id: number) => void
    removeAll: () => void
    itemIsSelected: (id: number) => boolean
}

const CartContext = createContext<CartContextType>({
    cartItemIds: [],
    addItem: () => { },
    removeItem: () => { },
    removeAll: () => { },
    itemIsSelected: () => false
})

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
    const [result, setResult] = useState<number[]>([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if (typeof window !== "undefined") {
            const items = localStorage.getItem(ADD_PARAM)?.split(",").map(i => +i) ?? []
            setResult(items)
            setIsLoaded(true)
        }
    }, [])

    useEffect(() => {
        if (typeof window !== "undefined" && isLoaded) {
            if (result.length) {
                localStorage.setItem(ADD_PARAM, result.join(","))
            } else {
                localStorage.removeItem(ADD_PARAM)
            }
        }
    }, [result, isLoaded])

    const addItem = (id: number) => {
        setResult(prev => ([...prev, id]))
    }

    const removeItem = (id: number) => {
        setResult(prev => ([...prev.filter(storedId => storedId !== id)]))
    }

    const removeAll = () => {
        setResult([])
    }

    const itemIsSelected = (id: number) => {
        return result.includes(id)
    }

    return (
        <CartContext.Provider value={{
            cartItemIds: result,
            addItem,
            removeItem,
            removeAll,
            itemIsSelected
        }}>{children}</CartContext.Provider>
    )
}

export const useCartItemIds = () => useContext(CartContext)
