"use client"

import ProductCard from "@/components/client/user/ProductCard"
import Loading from "@/components/common/Loading"
import { useEffect, useState } from "react"

export default function UserPage() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

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
            <Loading loading={loading}/>
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