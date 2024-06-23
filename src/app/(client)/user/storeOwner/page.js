"use client"

import ProductCard from "@/components/client/user/storeOwner/ProductCard"
import Loading from "@/components/common/Loading"
import { ROLES } from "@/helpers/roles"
import { getClientSession } from "@/helpers/sessions"
import { useRouter } from "next/navigation"
import { useEffect, useLayoutEffect, useState } from "react"

export default function StorOwnerPage() {

    const { push } = useRouter()

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useLayoutEffect(() => {
        getClientSession()
            .then(res => res.json())
            .then(user => {
                if (user && user.role !== ROLES.STORE_OWNER.name)
                    return push("/")
            })
    }, [])

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = () => {
        setLoading(true)

        fetch("/api/products")
            .then(res => res.json())
            .then(data => setProducts(data))
            .finally(() => setLoading(false))
    }

    return (
        <section>
            <Loading loading={loading} />
            {
                products?.length > 0 && (
                    <div className="grid grid-cols-6 gap-2">
                        {
                            products.map(pr => (
                                <ProductCard key={pr._id} product={pr} />
                            ))
                        }
                    </div>
                )
            }
        </section>
    )
}