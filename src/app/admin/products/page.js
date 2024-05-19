"use client"

import Loading from "@/components/common/Loading";
import Table from "@/components/common/Table";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Products() {

    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = () => {
        setLoading(true)

        fetch("/api/admin/products")
            .then(res => res.json())
            .then(data => setProducts(data))
            .finally(() => setLoading(false))
    }

    return (
        <section className="gap-4 flex flex-col h-full">
            <div className="w-full p-4 rounded-lg bg-white flex justify-between">
                <Link href={"/admin/products/create"} className="button submit">ایجاد محصول</Link>

                <div className="flex items-center gap-2">
                    <input type="text" className="!mb-0" placeholder="جستجو محصول" />
                    <button>جستجو</button>
                </div>
            </div>
            <div className="w-full p-4 rounded-lg bg-white h-full relative">
                <Loading loading={loading} />
                <Table data={products} headers={['نام', 'دسته بندی', 'برند', 'توضیحات', 'slug', 'مشخصات', 'مقدار عمده فروشی', 'قیمت عمده فروشی', 'قیمت تک فروشی', 'موجود']}/>
            </div>
        </section>
    )
}