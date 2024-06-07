"use client"

import Alert from "@/components/common/Alert";
import ConfirmBtn from "@/components/common/ConfirmBtn";
import Loading from "@/components/common/Loading";
import Tooltip from "@/components/common/Tooltip";
import BrandIcon from "@/components/icons/BrandIcon";
import MenuDotIcon from "@/components/icons/MenuDotIcon";
import MinusIcon from "@/components/icons/MinusIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import { formatPriceNumber } from "@/helpers/formatPriceInput";
import Image from "next/image";
import { useLayoutEffect, useState } from "react";

export default function CartPage() {

    const [loading, setLoading] = useState(false)
    const [cartItems, setCartItems] = useState([])

    useLayoutEffect(() => {
        getCartItems()
    }, [])

    const getCartItems = () => {
        setLoading(true)

        setCartItems(JSON.parse(localStorage.getItem('cart')))

        setLoading(false)
    }

    const getItemPrice = (item) => {
        let price = 0

        price += (item.quantities.retail_quantity * item.feature.retail_price)
        price += (item.quantities.wholesale_quantity * item.feature.wholesale_price)

        return price
    }

    const handleChangeItemQuantity = (item, quantity, field) => {
        setCartItems(prevItems => {
            let copyItems = [...prevItems]
            copyItems.map(ci => (ci.product._id === item.product._id) && (ci.quantities[field] = quantity))

            return [...copyItems]
        })
    }

    return (
        <section>
            <Loading loading={loading} />

            {
                cartItems?.length > 0 ? (
                    <div className="flex gap-2">
                        <div className="border rounded-lg p-4 flex flex-col gap-4 grow">
                            <div className="flex justify-between items-center border-b pb-2 mb-2">
                                <p className="font-semibold">سبد خرید شما ({cartItems?.length} کالا )</p>
                                <div className="cursor-pointer">
                                    <MenuDotIcon />
                                </div>
                            </div>
                            {
                                cartItems.map((item, index) => (
                                    <div key={index} className="flex gap-8 border-b pb-4">
                                        <div className="flex flex-col justify-between items-center">
                                            <Image src={item.product.images?.length ? item.product.images[0] : '/placeholders/img-placeholder.webp'} alt="product image" width={120} height={120} />

                                            <div className="flex flex-col gap-6 mt-4">

                                                <div>
                                                    <p className="text-sm">تعداد عمده ({item.feature.wholesale_quantity} عدد)</p>
                                                    <div className="relative flex items-center w-full gap-2 mt-2">
                                                        <button type="button" onClick={() => handleChangeItemQuantity(item, item.quantities.wholesale_quantity - item.feature.wholesale_quantity, "wholesale_quantity")} id="decrement-button" data-input-counter-decrement="bedrooms-input" className="">
                                                            <MinusIcon />
                                                        </button>
                                                        <div>
                                                            <div className="h-11 w-20">
                                                                <input type="text" className="z-10 text-black" value={item.quantities.wholesale_quantity} />
                                                            </div>
                                                            <div className="absolute bottom-0 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex grow items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse">
                                                                <span>عدد</span>
                                                            </div>
                                                        </div>
                                                        <button type="button" onClick={() => handleChangeItemQuantity(item, item.quantities.wholesale_quantity + item.feature.wholesale_quantity, "wholesale_quantity")} id="increment-button" data-input-counter-increment="bedrooms-input" >
                                                            <PlusIcon />
                                                        </button>
                                                    </div>
                                                    <p className="mt-1 text-center text-sm">هر عدد {formatPriceNumber(item.feature.wholesale_price)} تومان</p>
                                                </div>

                                                <div>
                                                    <p className="text-sm">تعداد خرده (1 عدد)</p>
                                                    <div className="relative flex items-center w-full gap-2 mt-2">
                                                        <button type="button" onClick={() => handleChangeItemQuantity(item, item.quantities.retail_quantity - 1, "retail_quantity")} id="decrement-button" data-input-counter-decrement="bedrooms-input" >
                                                            <MinusIcon />
                                                        </button>
                                                        <div>
                                                            <div className="h-11 w-20">
                                                                <input type="text" className="z-10 text-black" value={item.quantities.retail_quantity} />
                                                            </div>
                                                            <div className="absolute bottom-0 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex grow items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse">
                                                                <span>عدد</span>
                                                            </div>
                                                        </div>
                                                        <button type="button" onClick={() => handleChangeItemQuantity(item, item.quantities.retail_quantity + 1, "retail_quantity")} id="increment-button" data-input-counter-increment="bedrooms-input" >
                                                            <PlusIcon />
                                                        </button>
                                                    </div>
                                                    <p className="mt-1 text-center text-sm">هر عدد {formatPriceNumber(item.feature.retail_price)} تومان</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grow flex flex-col gap-4">
                                            <p className="">{item.product.name}</p>

                                            <div className="flex flex-col gap-1">

                                                <div className="flex gap-2 items-center">
                                                    <Image className={`relative size-4 rounded-full cursor-pointer`} width={40} height={40} src={item.feature.image ? item.feature.image : `/placeholders/img-placeholder.webp`} alt="" />
                                                    <p className="text-sm text-gray-600">{item.feature.name}</p>
                                                </div>

                                                <div className="flex gap-2 items-center">
                                                    <BrandIcon className="size-4 text-gray-600" />
                                                    <p className="text-sm text-gray-600">{item.product.brand.name}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-1 font-semibold">
                                                <p className="">{formatPriceNumber(getItemPrice(item))}</p>
                                                <p className="text-sm">تومان</p>
                                            </div>

                                            <div className="w-full">
                                                <ConfirmBtn className="w-full">
                                                    حذف از سبد خرید
                                                </ConfirmBtn>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ) : (
                    <Alert text="سبد خرید شما خالی است" />
                )
            }
        </section>
    )
}