"use client"

import Loading from "@/components/common/Loading";
import { ROLES } from "@/helpers/roles";
import { getClientSession } from "@/helpers/sessions";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

export default function DriverPage() {

    const { push } = useRouter()

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    useLayoutEffect(() => {
        getClientSession()
            .then(res => res.json())
            .then(user => {
                if (user && user.role !== ROLES.DRIVER.name)
                    return push("/")
            })
    }, [])

    useEffect(() => {
        fetchUserOrders()
    }, [])

    const fetchUserOrders = () => {
        setLoading(true)

        fetch("/api/orders")
            .then(res => res.json())
            .then(data => {
                setOrders(data)
            })
            .finally(() => setLoading(false))
    }

    return (
        <section>
            <Loading loading={loading} />

            <div>راننده</div>
        </section>
    )
}