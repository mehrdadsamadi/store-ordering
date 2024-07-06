"use client"

import Badge from "@/components/common/Badge";
import ConfirmBtn from "@/components/common/ConfirmBtn";
import Loading from "@/components/common/Loading";
import Table from "@/components/common/Table";
import Tooltip from "@/components/common/Tooltip";
import ArrowleftIcon from "@/components/icons/ArrowLeftIcon";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import EditIcon from "@/components/icons/EditIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import { formatPriceNumber } from "@/helpers/formatPriceInput";
import { formatToPersianDate } from "@/helpers/formatToPersianDate";
import { ORDER_STATUSES } from "@/helpers/orderStatuses";
import { PAYMENT_METHODS } from "@/helpers/paymentMethods";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Orders() {

    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState([])
    const [filteredOrders, setFilteredOrders] = useState([])
    const [selectedFilter, setSelectedFilter] = useState(ORDER_STATUSES['CONFIRMATION'])
    const [driverStatuses, setDriverStatuses] = useState({...ORDER_STATUSES})
    // const [columns, setColumns] = useState([
    //     {
    //         accessorKey: 'items',
    //         header: 'تعداد آیتم',
    //         id: 'items',
    //         cell: ({ row: { original } }) => {
    //             return (
    //                 <Tooltip direction="top" text={original.items.map(item => item.product.name).join('\n')}>
    //                     <p>{original.items.length}</p>
    //                 </Tooltip>
    //             );
    //         },
    //     },
    //     {
    //         accessorKey: 'userPhone',
    //         header: 'شماره تماس',
    //         id: 'userPhone',
    //     },
    //     {
    //         accessorKey: 'paid',
    //         header: 'پرداخت',
    //         id: 'paid',
    //         cell: ({ row: { original } }) => {
    //             return (
    //                 original.paid ?
    //                     <Badge className="!bg-green-500">پرداخت شده</Badge>
    //                     : <Badge className="!bg-red-500">پرداخت نشده</Badge>
    //             );
    //         },
    //     },
    //     {
    //         accessorKey: 'paymentMethod',
    //         header: 'روش پرداخت',
    //         id: 'paymentMethod',
    //         cell: ({ row: { original } }) => {
    //             return (
    //                 <p>{Object.keys(PAYMENT_METHODS).map(key => (PAYMENT_METHODS[key].name === original.paymentMethod && PAYMENT_METHODS[key].text))}</p>
    //             );
    //         },
    //     },
    //     // {
    //     //     accessorKey: 'status',
    //     //     header: 'وضعیت سفارش',
    //     //     id: 'status',
    //     //     cell: ({ row: { original } }) => {
    //     //         return (
    //     //             <p>{Object.keys(ORDER_STATUSES).map(key => (ORDER_STATUSES[key].name === original.status && ORDER_STATUSES[key].persian))}</p>
    //     //         );
    //     //     },
    //     // },
    //     {
    //         accessorKey: 'price',
    //         header: 'قیمت',
    //         id: 'price',
    //         cell: ({ row: { original } }) => {
    //             return (
    //                 <span className="text-primary font-semibold">{formatPriceNumber(original.price)} تومان</span>
    //             );
    //         },
    //     },
    //     {
    //         accessorKey: 'createdAt',
    //         header: 'تاریخ سفارش',
    //         id: 'createdAt',
    //         cell: ({ row: { original } }) => {
    //             return (
    //                 <p>{formatToPersianDate(original.createdAt)}</p>
    //             );
    //         },
    //     },
    //     {
    //         accessorKey: 'updatedAt',
    //         header: 'تاریخ آخرین تغییر',
    //         id: 'updatedAt',
    //         cell: ({ row: { original } }) => {
    //             return (
    //                 <p>{formatToPersianDate(original.updatedAt)}</p>
    //             );
    //         },
    //     },
    //     {
    //         accessorKey: 'actions',
    //         header: '',
    //         id: 'actions',
    //         cell: ({ row: { original } }) => (
    //             <div className="flex gap-2">
    //                 <button type="button" className="rounded-full !p-2 hover:bg-gray-200">
    //                     <EditIcon />
    //                 </button>
    //                 <button type="button" onClick={() => { console.log(original); }} className="rounded-full !p-2 hover:bg-gray-200">
    //                     <TrashIcon />
    //                 </button>
    //             </div>
    //         ),
    //     },
    // ])

    const getColumns = (selectedFilter) => [
        {
            accessorKey: '_id',
            header: 'شماره سفارش',
            id: '_id'
        },
        {
            accessorKey: 'items',
            header: 'تعداد آیتم',
            id: 'items',
            cell: ({ row: { original } }) => {
                return (
                    <Tooltip direction="top" arrayText={original.items.map(item => item.product.name)}>
                        <p>{original.items.length}</p>
                    </Tooltip>
                );
            },
        },
        {
            accessorKey: 'userPhone',
            header: 'شماره تماس',
            id: 'userPhone',
        },
        {
            accessorKey: 'paid',
            header: 'پرداخت',
            id: 'paid',
            cell: ({ row: { original } }) => {
                return (
                    original.paid ?
                        <Badge className="!bg-green-500">پرداخت شده</Badge>
                        : <Badge className="!bg-red-500">پرداخت نشده</Badge>
                );
            },
        },
        {
            accessorKey: 'paymentMethod',
            header: 'روش پرداخت',
            id: 'paymentMethod',
            cell: ({ row: { original } }) => {
                return (
                    <p>{Object.keys(PAYMENT_METHODS).map(key => (PAYMENT_METHODS[key].name === original.paymentMethod && PAYMENT_METHODS[key].text))}</p>
                );
            },
        },
        // {
        //     accessorKey: 'status',
        //     header: 'وضعیت سفارش',
        //     id: 'status',
        //     cell: ({ row: { original } }) => {
        //         return (
        //             <p>{Object.keys(ORDER_STATUSES).map(key => (ORDER_STATUSES[key].name === original.status && ORDER_STATUSES[key].persian))}</p>
        //         );
        //     },
        // },
        {
            accessorKey: 'price',
            header: 'قیمت',
            id: 'price',
            cell: ({ row: { original } }) => {
                return (
                    <span className="text-primary font-semibold">{formatPriceNumber(original.price)} تومان</span>
                );
            },
        },
        {
            accessorKey: 'createdAt',
            header: 'تاریخ سفارش',
            id: 'createdAt',
            cell: ({ row: { original } }) => {
                return (
                    <p>{formatToPersianDate(original.createdAt)}</p>
                );
            },
        },
        {
            accessorKey: 'updatedAt',
            header: 'تاریخ آخرین تغییر',
            id: 'updatedAt',
            cell: ({ row: { original } }) => {
                return (
                    <p>{formatToPersianDate(original.updatedAt)}</p>
                );
            },
        },
        {
            accessorKey: 'actions',
            header: '',
            id: 'actions',
            cell: ({ row: { original } }) => (
                <div className="flex gap-2">
                    {/* <button type="button" className="rounded-full !p-2 hover:bg-gray-200">
                        <EditIcon />
                    </button>
                    <ConfirmBtn onConfirm={() => handleRemoveOrder(original._id)} className="rounded-full !p-2 hover:bg-gray-200">
                        <TrashIcon />
                    </ConfirmBtn> */}
                    {
                        driverStatuses[selectedFilter.prev] && (
                            <Tooltip direction="top" text={`انتفال وضعیت سفارش به ${driverStatuses[selectedFilter.prev].persian}`}>
                                <button type="button" onClick={() => changeOrderStatus(original._id, driverStatuses[selectedFilter.prev].name)} className="rounded-full !p-2 hover:bg-gray-200">
                                    <ArrowRightIcon />
                                </button>
                            </Tooltip>
                        )
                    }
                    {
                        driverStatuses[selectedFilter.next] && (
                            <Tooltip direction="top" text={`انتفال وضعیت سفارش به ${driverStatuses[selectedFilter.next].persian}`}>
                                <button type="button" onClick={() => changeOrderStatus(original._id, driverStatuses[selectedFilter.next].name)} className="rounded-full !p-2 hover:bg-gray-200">
                                    <ArrowleftIcon />
                                </button>
                            </Tooltip>
                        )
                    }
                </div>
            ),
        },
    ];

    useEffect(() => {
        delete driverStatuses.PROCESSING
        delete driverStatuses.CANCELED
        
        fetchOrders()
    }, [])

    useEffect(() => {
        setFilteredOrders(orders.filter(od => od.status === selectedFilter.name))
    }, [selectedFilter])

    const fetchOrders = () => {
        setLoading(true)

        fetch("/api/orders")
            .then(res => res.json())
            .then(data => {
                setOrders(data.reverse())
                setFilteredOrders(data.filter(od => od.status === selectedFilter?.name))
            })
            .finally(() => setLoading(false))
    }

    // const handleRemoveOrder = async (orderId) => {
    //     setLoading(true)

    //     const removeOrderPromise = new Promise(async (resolve, reject) => {
    //         const res = await fetch("/api/orders", {
    //             method: "DELETE",
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ _id: orderId }),
    //         })

    //         const body = await res.json()
    //         res.ok ? resolve(body) : reject(body)
    //     })

    //     await toast.promise(
    //         removeOrderPromise,
    //         {
    //             loading: 'در حال حذف سفارش ...',
    //             success: ({ message }) => message,
    //             error: ({ error }) => error,
    //         }
    //     )
    //         .then(() => fetchOrders())
    //         .finally(() => setLoading(false))
    // }

    const changeOrderStatus = async (orderId, statusName) => {
        setLoading(true)

        const nextStatusPromise = new Promise(async (resolve, reject) => {

            const res = await fetch("/api/orders", {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: orderId, status: statusName }),
            })

            const body = await res.json()
            res.ok ? resolve(body) : reject(body)
        })

        await toast.promise(
            nextStatusPromise,
            {
                loading: 'در حال تغییر وضعیت سفارش',
                success: ({ message }) => message,
                error: ({ error }) => error,
            }
        )
            .then(() => fetchOrders())
            .finally(() => setLoading(false))
    }

    return (
        <section className="gap-4 flex flex-col h-full">
            <div className="w-full p-4 rounded-lg bg-white h-full relative">
                <Loading loading={loading} />
                {/* <a referrerpolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=505319&Code=0deLhhr5L8TMTemLlTlLeSb6i9IJq2Yb'><img referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=505319&Code=0deLhhr5L8TMTemLlTlLeSb6i9IJq2Yb' alt='' className="cursor-pointer" code='0deLhhr5L8TMTemLlTlLeSb6i9IJq2Yb' /></a> */}
                <div className="flex gap-2">
                    <div className="border rounded-lg p-4 flex flex-col gap-4 items-center mt-2">
                        {
                            Object.keys(driverStatuses).map((key, index) => (
                                <button key={index} type="button" onClick={() => setSelectedFilter(driverStatuses[key])} className={`w-full flex justify-between ${selectedFilter?.name === driverStatuses[key].name && 'submit'} `}>
                                    {driverStatuses[key].persian}
                                    <span className="p-2 rounded-lg bg-gray-100 size-8 flex items-center justify-center text-primary">
                                        {orders.filter(order => order.status === driverStatuses[key].name).length}
                                    </span>
                                </button>
                            ))
                        }
                    </div>
                    <div className="grow">
                        <Table data={filteredOrders} columns={getColumns(selectedFilter)} />
                    </div>
                </div>
            </div>
        </section>
    )
}