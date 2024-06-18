"use client"

import Alert from "@/components/common/Alert";
import Loading from "@/components/common/Loading";
import { useState } from "react";

export default function OrdersPage() {

    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState([])

    return (
        <section>
            <Loading loading={loading} />

            {
                orders?.length > 0 ? (
                    <div></div>
                ) : (
                    <Alert text="شما تاکنون سفارشی نداشته اید"/>
                )
            }
        </section>
    )
}