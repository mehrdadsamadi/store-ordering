"use client"

import Alert from "@/components/common/Alert";
import Badge from "@/components/common/Badge";
import Loading from "@/components/common/Loading";
import ProgressBar from "@/components/common/ProgressBar";
import ArrowUturnRightIcon from "@/components/icons/ArrowUturnRightIcon";
import CheckIcon from "@/components/icons/CheckIcon";
import ClockIcon from "@/components/icons/ClockIcon";
import XmarkIcon from "@/components/icons/XmarkIcon";
import { formatPriceNumber } from "@/helpers/formatPriceInput";
import { formatToPersianDate } from "@/helpers/formatToPersianDate";
import { ORDER_STATUSES } from "@/helpers/orderStatuses";
import { PAYMENT_METHODS } from "@/helpers/paymentMethods";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function OrdersPage() {

    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState([])
    const [currentOrdersLength, setCurrentOrdersLength] = useState([])
    const [filteredOrders, setFilteredOrders] = useState([])
    const [selectedFilter, setSelectedFilter] = useState("current")

    useEffect(() => {
        fetchUserOrders()
    }, [])
    
    useEffect(() => {
        if(selectedFilter === "current") {
            setFilteredOrders(orders.filter(od => (od.status !== ORDER_STATUSES.DELIVERY.name && od.status !== ORDER_STATUSES.RETURNED.name && od.status !== ORDER_STATUSES.CANCELED.name)))
        } else {
            setFilteredOrders(orders.filter(od => (od.status === ORDER_STATUSES[selectedFilter.toUpperCase()].name)))
        }
    }, [selectedFilter])

    const fetchUserOrders = () => {
        setLoading(true)

        fetch("/api/orders")
            .then(res => res.json())
            .then(data => {
                setOrders(data)
                setFilteredOrders(data.filter(od => (od.status !== ORDER_STATUSES.DELIVERY.name && od.status !== ORDER_STATUSES.RETURNED.name && od.status !== ORDER_STATUSES.CANCELED.name)))
                setCurrentOrdersLength(data.filter(od => (od.status !== ORDER_STATUSES.DELIVERY.name && od.status !== ORDER_STATUSES.RETURNED.name && od.status !== ORDER_STATUSES.CANCELED.name)).length)
            })
            .finally(() => setLoading(false))
    }

    return (
        <section>
            <Loading loading={loading} />

            {
                orders?.length > 0 ? (
                    <div className="border rounded-lg p-4 flex flex-col">
                        <div className="flex items-center justify-between border-b pb-4 mb-4">
                            <p className="font-semibold">تاریخچه سفارشات</p>
                            {/* search */}
                        </div>
                        <div>
                            <div className="md:flex">
                                <ul className="flex-column space-y space-y-4 w-56 font-medium md:me-4 mb-4 md:mb-0">
                                    <li>
                                        <div onClick={() => setSelectedFilter("current")} className={`inline-flex items-center cursor-pointer hover:bg-gray-100 gap-2 px-4 py-3 text-primary border border-primary rounded-lg w-full ${selectedFilter === "current" && '!bg-primary !text-white'}`} aria-current="page">
                                            <ClockIcon />
                                            <div className="flex items-center grow justify-between">
                                                <p>جاری</p>
                                                <div className="rounded-md flex items-center justify-center bg-gray-300 text-primary size-7">
                                                    {currentOrdersLength}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div onClick={() => setSelectedFilter(ORDER_STATUSES.DELIVERY.name)} className={`inline-flex items-center cursor-pointer hover:bg-gray-100 gap-2 px-4 py-3 rounded-lg text-primary border border-primary w-full ${selectedFilter === ORDER_STATUSES.DELIVERY.name && '!bg-primary !text-white'}`}>
                                            <CheckIcon />
                                            <div className="flex items-center grow justify-between">
                                                <p>تحویل شده</p>
                                                <div className="rounded-md flex items-center justify-center bg-gray-300 text-primary size-7">
                                                    {orders.filter(od => od.status === ORDER_STATUSES.DELIVERY.name).length}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div onClick={() => setSelectedFilter(ORDER_STATUSES.RETURNED.name)} className={`inline-flex items-center cursor-pointer hover:bg-gray-100 gap-2 px-4 py-3 rounded-lg text-primary border border-primary w-full ${selectedFilter === ORDER_STATUSES.RETURNED.name && '!bg-primary !text-white'}`}>
                                            <ArrowUturnRightIcon />
                                            <div className="flex items-center grow justify-between">
                                                <p>مرجوع شده</p>
                                                <div className="rounded-md flex items-center justify-center bg-gray-300 text-primary size-7">
                                                    {orders.filter(od => od.status === ORDER_STATUSES.RETURNED.name).length}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div onClick={() => setSelectedFilter(ORDER_STATUSES.CANCELED.name)} className={`inline-flex items-center cursor-pointer hover:bg-gray-100 gap-2 px-4 py-3 rounded-lg text-primary border border-primary w-full ${selectedFilter === ORDER_STATUSES.CANCELED.name && '!bg-primary !text-white'}`}>
                                            <XmarkIcon />
                                            <div className="flex items-center grow justify-between">
                                                <p>لغو شده</p>
                                                <div className="rounded-md flex items-center justify-center bg-gray-300 text-primary size-7">
                                                    {orders.filter(od => od.status === ORDER_STATUSES.CANCELED.name).length}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <div className="p-6 text-medium border border-primary rounded-lg w-full flex flex-col gap-4">
                                    {
                                        filteredOrders?.length > 0 ? (
                                            filteredOrders.map(co => (
                                                <div key={co._id} className="border rounded-md p-4 flex gap-4">
                                                    <div className="flex flex-col gap-4">
                                                        <div className="w-[200px]">
                                                            <div className="font-medium text-sm text-primary">
                                                                {Object.keys(ORDER_STATUSES).map(key => (ORDER_STATUSES[key].name === co.status && ORDER_STATUSES[key].persian))}
                                                            </div>
                                                            <ProgressBar progress={Object.keys(ORDER_STATUSES).map(key => (ORDER_STATUSES[key].name === co.status && ORDER_STATUSES[key].progress)).filter(Boolean)[0]} />
                                                        </div>
                                                        <div className="flex text-gray-500">
                                                            <p>{formatToPersianDate(co.createdAt)}</p>
                                                            <p className="mx-2">|</p>
                                                            <p>کد سفارش: <span className="text-primary font-semibold">{co._id}</span></p>
                                                            <p className="mx-2">|</p>
                                                            <p>مبلغ سفارش: <span className="text-primary font-semibold">{formatPriceNumber(co.price)} تومان</span></p>
                                                        </div>
                                                        <div className="flex text-gray-500">
                                                            <p>آدرس: <span className="text-primary font-semibold">{co.address.name}</span></p>
                                                            <p className="mx-2">|</p>
                                                            <p>{Object.keys(PAYMENT_METHODS).map(key => (PAYMENT_METHODS[key].name === co.paymentMethod && PAYMENT_METHODS[key].text))}</p>
                                                            <p className="mx-2">|</p>
                                                            {
                                                                co.paid ?
                                                                    <Badge className="!bg-green-500">پرداخت شده</Badge>
                                                                    : <Badge className="bg-red-500">پرداخت نشده</Badge>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="border-r pr-2 mr-2 flex gap-2 overflow-x-auto">
                                                        {
                                                            co.items.map(item => (
                                                                item.product.images.map((image, index) => (
                                                                    <div key={index} className="bg-gray-100 p-2 rounded-lg">
                                                                        <Image key={index} src={image || "/placeholders/img-placeholder.webp"} alt="product image" className="size-28 rounded-md" width={112} height={112} />
                                                                    </div>
                                                                ))
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <Alert text="سفارشی در این بخش ندارید" />
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Alert text="شما تاکنون سفارشی نداشته اید" />
                )
            }
        </section>
    )
}