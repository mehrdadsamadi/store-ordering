"use client"

import Badge from "@/components/common/Badge";
import ConfirmBtn from "@/components/common/ConfirmBtn";
import Loading from "@/components/common/Loading";
import Table from "@/components/common/Table";
import EditIcon from "@/components/icons/EditIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Features() {
    
    const [loading, setLoading] = useState(true)
    const [features, setFeatures] = useState([])
    const [columns, setColumns] = useState([
        {
            accessorKey: 'features',
            header: 'ویژگی ها',
            id: 'features',
            cell: ({ row: { original } }) => {
                return (
                    original?.features?.map(f => (
                        <Badge key={f._id}>{f.featureTitle}</Badge>
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
                    <Link href={`/admin/features/create/${original._id}`} className="button rounded-full !p-2 hover:bg-gray-200">
                        <EditIcon />
                    </Link>
                    <ConfirmBtn onConfirm={() => handleRemoveFeature(original._id)} className="rounded-full !p-2 hover:bg-gray-200">
                        <TrashIcon />
                    </ConfirmBtn>
                </div>
            ),
        },
    ])

    useEffect(() => {
        fetchFeatures()
    }, [])

    const handleRemoveFeature = async (featureId) => {
        const removeFeaturePromise = new Promise(async (resolve, reject) => {
            const res = await fetch("/api/admin/features", {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: featureId }),
            })

            fetchFeatures()

            const body = await res.json()
            res.ok ? resolve(body) : reject(body)
        })

        await toast.promise(
            removeFeaturePromise,
            {
                loading: 'در حال حذف ویژگی ...',
                success: ({ message }) => message,
                error: ({ error }) => error,
            }
        )
    }

    const fetchFeatures = () => {
        setLoading(true)

        fetch("/api/admin/features")
            .then(res => res.json())
            .then(data => setFeatures(data))
            .finally(() => setLoading(false))
    }

    return (
        <section className="gap-4 flex flex-col h-full">
            <div className="w-full p-4 rounded-lg bg-white flex justify-between">
                <Link href={"/admin/features/create"} className="button submit">ایجاد ویژگی</Link>

                {/* <div className="flex items-center gap-2">
                    <input type="text" className="!mb-0" placeholder="جستجو ویژگی" />
                    <button>جستجو</button>
                </div> */}
            </div>
            <div className="w-full p-4 rounded-lg bg-white h-full relative">
                <Loading loading={loading} />
                <Table data={features} columns={columns}/>
            </div>
        </section>
    )
}