"use client"

import Badge from "@/components/common/Badge";
import Loading from "@/components/common/Loading";
import Table from "@/components/common/Table";
import Tooltip from "@/components/common/Tooltip";
import EditIcon from "@/components/icons/EditIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import { formatPriceNumber } from "@/helpers/formatPriceInput";
import { formatToPersianDate } from "@/helpers/formatToPersianDate";
import { ORDER_STATUSES } from "@/helpers/orderStatuses";
import { PAYMENT_METHODS } from "@/helpers/paymentMethods";
import { useEffect, useState } from "react";

export default function Orders() {

    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState([])
    const [filteredOrders, setFilteredOrders] = useState([])
    const [selectedFilter, setSelectedFilter] = useState(ORDER_STATUSES['PROCESSING'])
    const [columns, setColumns] = useState([
        {
            accessorKey: 'items',
            header: 'تعداد آیتم',
            id: 'items',
            cell: ({ row: { original } }) => {
                return (
                    <Tooltip text={original.items.map(item => item.product.name).join('\n')}>
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
                        <Badge className="bg-green-500">پرداخت شده</Badge>
                        : <Badge className="bg-red-500">پرداخت نشده</Badge>
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
                    <button type="button" className="rounded-full !p-2 hover:bg-gray-200">
                        <EditIcon />
                    </button>
                    <button type="button" onClick={() => { console.log(original); }} className="rounded-full !p-2 hover:bg-gray-200">
                        <TrashIcon />
                    </button>
                </div>
            ),
        },
    ])

    useEffect(() => {
        fetchOrders()
    }, [])

    useEffect(() => {
        setFilteredOrders(orders.filter(od => od.status === selectedFilter.name))
    }, [selectedFilter])

    const fetchOrders = () => {
        setLoading(true)

        fetch("/api/admin/orders")
            .then(res => res.json())
            .then(data => {
                setOrders(data)
                setFilteredOrders(data.filter(od => od.status === "processing"))
            })
            .finally(() => setLoading(false))
    }

    return (
        <section className="gap-4 flex flex-col h-full">
            <div className="w-full p-4 rounded-lg bg-white h-full relative">
                <Loading loading={loading} />
                <div className="flex gap-2">
                    <div className="border rounded-lg p-4 flex flex-col gap-4 items-center mt-2">
                        {
                            Object.keys(ORDER_STATUSES).map((key, index) => (
                                <button key={index} type="button" onClick={() => setSelectedFilter(ORDER_STATUSES[key])} className={`w-full ${selectedFilter?.name === ORDER_STATUSES[key].name && 'submit'} `}>{ORDER_STATUSES[key].persian}</button>
                            ))
                        }
                    </div>
                    <div className="grow">
                        <Table data={filteredOrders} columns={columns} />
                    </div>
                </div>
            </div>
        </section>
    )
}