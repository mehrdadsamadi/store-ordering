"use client"

import Badge from "@/components/common/Badge";
import Loading from "@/components/common/Loading";
import Table from "@/components/common/Table";
import EditIcon from "@/components/icons/EditIcon";
import EyeIcon from "@/components/icons/EyeIcon";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Products() {

    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [columns, setColumns] = useState([
        {
            accessorKey: 'name',
            header: 'نام',
            id: 'name',
            cell: ({ row: { original } }) => {
                return (
                    <div className="flex items-center gap-2">
                        <Image width={50} height={50} className="w-10 h-10 rounded-full" src={original.images[0] || '/placeholders/user-placeholder.jpg'} alt="Jese image" />
                        <div className="text-base">{original.name}</div>
                    </div>
                );
            },
        },
        {
            accessorKey: 'slug',
            header: 'اسلاگ',
            id: 'slug',
        },
        {
            accessorKey: 'visible',
            header: 'قابل نمایش',
            id: 'visible',
            cell: ({ row: { original } }) => {
                return (
                    <Badge>{original.visible ? "بله" : 'خیر'}</Badge>
                );
            },
        },
        {
            accessorKey: 'brand',
            header: 'برند',
            id: 'brand',
            cell: ({ row: { original } }) => {
                return (
                    <span>{original.brand.name}</span>
                );
            },
        },
        {
            accessorKey: 'category',
            header: 'دسته بندی',
            id: 'category',
            cell: ({ row: { original } }) => {
                return (
                    <span>{original.category.name}</span>
                );
            },
        },
        {
            accessorKey: 'actions',
            header: '',
            id: 'actions',
            cell: ({ row: { original } }) => (
                <div className="flex gap-2">
                    <Link href={`/admin/products/create/${original._id}`} className="button rounded-full !p-2 hover:bg-gray-200">
                        <EditIcon />
                    </Link>
                    <button type="button" className="rounded-full !p-2 hover:bg-gray-200">
                        <EyeIcon />
                    </button>
                </div>
            ),
        },
    ])

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

                {/* <div className="flex items-center gap-2">
                    <input type="text" className="!mb-0" placeholder="جستجو محصول" />
                    <button>جستجو</button>
                </div> */}
            </div>
            <div className="w-full p-4 rounded-lg bg-white h-full relative">
                <Loading loading={loading} />
                <Table data={products} columns={columns} />
            </div>
        </section>
    )
}