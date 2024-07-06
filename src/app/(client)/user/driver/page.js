"use client"

import Alert from "@/components/common/Alert";
import Badge from "@/components/common/Badge";
import ConfirmBtn from "@/components/common/ConfirmBtn";
import Dialog from "@/components/common/Dialog";
import Loading from "@/components/common/Loading";
import Map from "@/components/common/Map";
import DataTable from "@/components/common/Table";
import Tooltip from "@/components/common/Tooltip";
import { formatPriceNumber } from "@/helpers/formatPriceInput";
import { formatToPersianDate } from "@/helpers/formatToPersianDate";
import { ORDER_STATUSES } from "@/helpers/orderStatuses";
import { ROLES } from "@/helpers/roles";
import { getClientSession } from "@/helpers/sessions";
import { timeUntil } from "@/helpers/timeUntil";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DriverPage() {

    const { push } = useRouter()

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [showDialog, setShowDialog] = useState(false)
    const [showBiddingDialog, setShowBiddingDialog] = useState(false)
    const [dialogData, setDialogData] = useState()
    const [bidding, setBidding] = useState('')

    const [columns, setColumns] = useState([
        {
            accessorKey: '_id',
            header: 'شماره سفارش',
            id: '_id'
        },
        {
            accessorKey: 'items',
            header: 'تعداد محصول',
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
            accessorKey: 'address',
            header: 'آدرس',
            id: 'address',
            cell: ({ row: { original } }) => {
                return (
                    <div className="flex flex-col">
                        <p>{original.address.address}</p>
                        <button type="button" onClick={() => { setDialogData(original); setShowDialog(true) }} className="mx-auto">مسیر یابی</button>
                    </div>
                );
            },
        },
        {
            accessorKey: 'userPhone',
            header: 'شماره تماس',
            id: 'userPhone',
        },
        // {
        //     accessorKey: 'paid',
        //     header: 'پرداخت',
        //     id: 'paid',
        //     cell: ({ row: { original } }) => {
        //         return (
        //             original.paid ?
        //                 <Badge className="!bg-green-500">پرداخت شده</Badge>
        //                 : <Badge className="!bg-red-500">پرداخت نشده</Badge>
        //         );
        //     },
        // },
        // {
        //     accessorKey: 'paymentMethod',
        //     header: 'روش پرداخت',
        //     id: 'paymentMethod',
        //     cell: ({ row: { original } }) => {
        //         return (
        //             <p>{Object.keys(PAYMENT_METHODS).map(key => (PAYMENT_METHODS[key].name === original.paymentMethod && PAYMENT_METHODS[key].text))}</p>
        //         );
        //     },
        // },
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
            header: 'قیمت بار',
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
            accessorKey: 'remainingBiddingTime',
            header: 'زمان باقی مانده',
            id: 'remainingBiddingTime',
            cell: ({ row: { original } }) => {
                return (
                    <p dir="ltr">{timeUntil(original.endBiddingAt)}</p>
                );
            },
        },
        {
            accessorKey: 'shippingInfo',
            header: 'کمترین قیمت پیشنهادی',
            id: 'shippingInfo',
            cell: ({ row: { original } }) => {
                return (
                    <span className="text-primary font-semibold">
                        {
                            original?.shippingInfo ? (
                                <p>
                                    {
                                        formatPriceNumber(original?.shippingInfo?.shippingCost)
                                    }
                                    <span className="mr-1">
                                        تومان
                                    </span>
                                </p>
                            ) : (
                                <Badge className="!bg-red-400">ندارد</Badge>
                            )
                        }
                    </span>
                );
            },
        },
        {
            accessorKey: 'actions',
            header: 'ثبت قیمت پیشنهادی شما',
            id: 'actions',
            cell: ({ row: { original } }) => (
                <button type="button" onClick={() => { setDialogData(original); setShowBiddingDialog(true) }}>ثبت قیمت پیشنهادی</button>
            ),
        },
    ])

    const handleBiddingSubmit = async (orderId) => {
        if (bidding >= dialogData?.shippingInfo?.shippingCost) {
            return toast.error("قیمت پیشنهادی شما باید از کمترین قیمت پایین تر باشد")
        }

        setLoading(true)

        const submitBiddingPromise = new Promise(async (resolve, reject) => {

            const res = await fetch("/api/orders/bidding", {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId, shippingCost: bidding }),
            })

            const body = await res.json()
            res.ok ? resolve(body) : reject(body)
        })

        await toast.promise(
            submitBiddingPromise,
            {
                loading: 'در حال ثبت قیمت',
                success: ({ message }) => message,
                error: ({ error }) => error,
            }
        )
            .then(() => {
                fetchOrders()
                setBidding('')
            })
            .finally(() => {
                setLoading(false)
                setShowBiddingDialog(false)
            })
    }

    useLayoutEffect(() => {
        getClientSession()
            .then(res => res.json())
            .then(user => {
                if (user && user.role !== ROLES.DRIVER.name)
                    return push("/")
            })
    }, [])

    useEffect(() => {
        const eventSource = new EventSource('/api/driver');

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setOrders(data.filter(order => order.status === ORDER_STATUSES.PROCESSING.name));
        };

        return () => {
            eventSource.close();
        };
    }, []);

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = () => {
        setLoading(true)

        fetch("/api/orders")
            .then(res => res.json())
            .then(data => {
                setOrders(data.filter(order => order.status === ORDER_STATUSES.PROCESSING.name))
            })
            .finally(() => setLoading(false))
    }

    return (
        <section>
            <Loading loading={loading} />

            <div className="grow">
                <DataTable data={orders} columns={columns} />
            </div>

            <Dialog showDialog={showDialog} title="مسیر یابی آدرس" submitBtnText="مسیر یابی توسط نشان" onSubmit={() =>  window.open(`https://nshn.ir/?lat=${dialogData?.address.location.lat}&lng=${dialogData?.address.location.lng}`)} onClose={() => setShowDialog(false)}>
                <div className="w-[300px] h-[300px] overflow-hidden rounded-md mx-auto">
                    <Map canRouting startPoint={[35.715298, 51.404343]} endPoint={[dialogData?.address.location.lat, dialogData?.address.location.lng]} center={[35.715298, 51.404343]} />
                </div>

            </Dialog>

            <Dialog showDialog={showBiddingDialog} title="ثبت قیمت پیشنهادی" submitBtnText="ثبت" onSubmit={() => handleBiddingSubmit(dialogData._id)} onClose={() => { setShowBiddingDialog(false); setBidding('') }}>
                <div className="h-11 mb-10">
                    <input type="text" value={bidding} onChange={e => setBidding(e.target.value)} className="!mb-0" placeholder="پیشنهاد قیمت حمل" />
                    <p className="text-sm text-center mt-1">{formatPriceNumber(bidding)} تومان</p>
                </div>

            </Dialog>
        </section>
    )
}