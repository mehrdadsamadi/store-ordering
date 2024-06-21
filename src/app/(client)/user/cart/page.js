"use client"

import ChoosePaymentMethod from "@/components/client/user/cart/ChoosePaymentMethod";
import ChooseShippingAddress from "@/components/client/user/cart/ChooseShippingAddress";
import Alert from "@/components/common/Alert";
import ConfirmBtn from "@/components/common/ConfirmBtn";
import Loading from "@/components/common/Loading";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import BrandIcon from "@/components/icons/BrandIcon";
import MenuDotIcon from "@/components/icons/MenuDotIcon";
import MinusIcon from "@/components/icons/MinusIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import { formatPriceNumber } from "@/helpers/formatPriceInput";
import { getItemPrice } from "@/helpers/getItemPrice";
import { ORDER_STATUSES } from "@/helpers/orderStatuses";
import { PAYMENT_METHODS } from "@/helpers/paymentMethods";
import { CartContext } from "@/prodviders/client/CartProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CartPage() {

    const { push } = useRouter()
    const { clearCart, removeProductFromCart } = useContext(CartContext)

    const [loading, setLoading] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [address, setAddress] = useState()
    const [method, setMethod] = useState(PAYMENT_METHODS.INTERNET.name)
    const [shippingCost, setShippingCost] = useState(100000)
    const [step, setStep] = useState(1)

    useLayoutEffect(() => {
        getCartItems()
    }, [])

    const getCartItems = () => {
        setLoading(true)

        setCartItems(JSON.parse(localStorage.getItem('cart')))

        setLoading(false)
    }

    const handleChangeItemQuantity = (item, quantity, field) => {
        setCartItems(prevItems => {
            let copyItems = [...prevItems]
            copyItems.map(ci => (ci.product._id === item.product._id) && (ci.quantities[field] = quantity))

            return [...copyItems]
        })
    }

    const handleSidebarClick = async () => {
        if (step !== 3) {
            setStep(prev => prev + 1)
        } else {
            setLoading(true)

            const order = {
                address: address._id,
                paymentMethod: method,
                paid: method === PAYMENT_METHODS.SPOT.name ? false : true,
                status: ORDER_STATUSES.PROCESSING.name,
                items: cartItems,
                price: cartItems.reduce((acc, cur) => getItemPrice(cur) + acc, 0) + shippingCost
            }

            const createOrderPromise = new Promise(async (resolve, reject) => {

                const res = await fetch("/api/orders/", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(order),
                })

                const body = await res.json()
                res.ok ? resolve(body) : reject(body)
            })

            await toast.promise(
                createOrderPromise,
                {
                    loading: 'در حال ثبت سفارش',
                    success: ({ message }) => message,
                    error: ({ error }) => error,
                }
            )
                .then(() => {
                    clearCart({ hasToast: false })
                    return push("/user/orders")
                })
                .finally(() => setLoading(false))
        }
    }

    return (
        <section>
            <Loading loading={loading} />

            {
                cartItems?.length > 0 ? (
                    <>
                        {
                            step !== 1 && (
                                <div className="border rounded-lg p-4 flex items-center gap-4 grow w-full mb-2 cursor-pointer" onClick={() => setStep(prev => prev - 1)}>
                                    <ArrowRightIcon />
                                    {
                                        step === 2 && (
                                            <p>سبد خرید</p>
                                        )
                                    }
                                    {
                                        step === 3 && (
                                            <p>انتخاب آدرس</p>
                                        )
                                    }
                                </div>
                            )
                        }
                        <div className="flex gap-2">
                            {
                                step === 1 && (
                                    <div className="border rounded-lg p-4 flex flex-col gap-4 grow">
                                        <div className="flex justify-between items-center border-b pb-2 mb-2">
                                            <p className="font-semibold">سبد خرید شما ({cartItems?.length} کالا )</p>
                                            <div className="cursor-pointer">
                                                <MenuDotIcon />
                                            </div>
                                        </div>
                                        <div className="overflow-y-auto h-[90vh]">
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
                                                                <ConfirmBtn className="w-full" onConfirm={() => {removeProductFromCart(item.product._id); getCartItems()}}>
                                                                    حذف از سبد خرید
                                                                </ConfirmBtn>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                )
                            }
                            {
                                step === 2 && (
                                    <div className="border rounded-lg p-4 flex flex-col gap-4 grow">
                                        <ChooseShippingAddress setAddress={setAddress} />
                                    </div>
                                )
                            }
                            {
                                step === 3 && (
                                    <div className="border rounded-lg p-4 flex flex-col gap-4 grow">
                                        <ChoosePaymentMethod method={method} setMethod={setMethod} />
                                    </div>
                                )
                            }
                            <div className="border rounded-lg p-4 flex flex-col gap-4 items-center h-fit">
                                <div className="flex justify-between items-center gap-20 w-full">
                                    <p className="text-sm">قیمت کالا ها ({cartItems.length})</p>
                                    <p>{formatPriceNumber(cartItems.reduce((acc, cur) => getItemPrice(cur) + acc, 0))} تومان</p>
                                </div>
                                <div className="flex justify-between items-center gap-20 w-full">
                                    <p className="text-sm">هزینه ارسال</p>
                                    <p>{formatPriceNumber(shippingCost)} تومان</p>
                                </div>
                                <div className="w-full h-[1px] bg-gray-200 rounded-lg"></div>
                                <div className="flex justify-between items-center gap-20 w-full">
                                    <p className="text-sm">جمع سبد خرید</p>
                                    <p>{formatPriceNumber(cartItems.reduce((acc, cur) => getItemPrice(cur) + acc, 0) + shippingCost)} تومان</p>
                                </div>
                                <div className="w-full">
                                    <button type="button" className="submit w-full" onClick={handleSidebarClick}>
                                        {
                                            step === 1 && (
                                                <p>تایید و انتخاب آدرس ارسال</p>
                                            )
                                        }
                                        {
                                            step === 2 && (
                                                <p>تایید و انتخاب روش پرداخت</p>
                                            )
                                        }
                                        {
                                            step === 3 && (
                                                <p>تایید و پرداخت</p>
                                            )
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <Alert text="سبد خرید شما خالی است" />
                )
            }
        </section>
    )
}