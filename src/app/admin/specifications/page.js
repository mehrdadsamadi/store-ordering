"use client"

import Badge from "@/components/common/Badge";
import Loading from "@/components/common/Loading";
import Table from "@/components/common/Table";
import EditIcon from "@/components/icons/EditIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Specifications() {
    
    const [loading, setLoading] = useState(true)
    const [specs, setSpecs] = useState([])
    const [columns, setColumns] = useState([
        {
            accessorKey: 'specifications',
            header: 'مشخصات',
            id: 'specifications',
            cell: ({ row: { original } }) => {
                return (
                    original?.specifications?.map(spec => (
                        <Badge key={spec._id}>{spec.specTitle}</Badge>
                    ))
                );
            },
        },
        {
            accessorKey: 'product',
            header: 'محصول',
            id: 'product',
            cell: ({ row: { original } }) => {
                return (
                    <span>{original.product.name}</span>
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
        fetchSpecs()
    }, [])

    const fetchSpecs = () => {
        setLoading(true)

        fetch("/api/admin/specifications")
            .then(res => res.json())
            .then(data => setSpecs(data))
            .finally(() => setLoading(false))
    }

    return (
        <section className="gap-4 flex flex-col h-full">
            <div className="w-full p-4 rounded-lg bg-white flex justify-between">
                <Link href={"/admin/specifications/create"} className="button submit">ایجاد مشخصات</Link>

                <div className="flex items-center gap-2">
                    <input type="text" className="!mb-0" placeholder="جستجو مشخصات" />
                    <button>جستجو</button>
                </div>
            </div>
            <div className="w-full p-4 rounded-lg bg-white h-full relative">
                <Loading loading={loading} />
                <Table data={specs} columns={columns}/>
            </div>
        </section>
    )
}