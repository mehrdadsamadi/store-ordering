"use client"

import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({})

export default function CartProviders({ children }) {

    const [cartProducts, setCartProducts] = useState([])

    useEffect(() => {
        if (localStorage.getItem('cart')) {
            setCartProducts(JSON.parse(localStorage.getItem('cart')))
        }
    }, [])

    const clearCart = ({ hasToast = true }) => {
        setCartProducts([])
        saveCartProductsToLocalStorage([])
        if (hasToast) {
            toast.success("سبد خرید با موفقیت پاک شد")
        }
    }

    const removeProductFromCart = (productId) => {
        setCartProducts(prevProducts => {
            const newCartProducts = prevProducts.filter((cp) => cp.product._id !== productId)
            saveCartProductsToLocalStorage(newCartProducts)
            return newCartProducts
        })

        toast.success("محصول با موفقیت از سبد خرید حذف شد")
    }

    const saveCartProductsToLocalStorage = (cartProducts) => {
        localStorage.setItem('cart', JSON.stringify(cartProducts))
    }

    const addToCart = (product, feature, quantities) => {
        setCartProducts(prevProducts => {
            const cartProduct = { product, feature, quantities }
            const newProducts = [...prevProducts, cartProduct]
            saveCartProductsToLocalStorage(newProducts)
            return newProducts
        })
        
        toast.success("محصول با موفقیت به سبد خرید افزوده شد")
    }

    return (
        <CartContext.Provider value={{
            cartProducts,
            setCartProducts,
            addToCart,
            clearCart,
            removeProductFromCart
        }}>
            {children}
        </CartContext.Provider>
    )
}