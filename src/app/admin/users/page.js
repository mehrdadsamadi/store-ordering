"use client"

import Loading from "@/components/common/Loading";
import Table from "@/components/common/Table";
import EditIcon from "@/components/icons/EditIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Users() {

    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([])
    const [columns, setColumns] = useState([
        {
            accessorKey: 'first_name',
            header: 'نام',
            id: 'first_name',
            cell: ({ row: { original } }) => {
                return (
                    <div className="flex items-center gap-2">
                        <Image width={50} height={50} className="w-10 h-10 rounded-full" src={original.avatar || '/placeholders/user-placeholder.jpg'} alt="Jese image" />
                        <div className="text-base">{original.first_name + " " + original.last_name}</div>
                    </div>
                );
            },
        },
        {
            accessorKey: 'phone',
            header: 'تلفن',
            id: 'phone',
        },
        {
            accessorKey: 'role',
            header: 'نقش',
            id: 'role',
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
        fetchUsers()
    }, [])

    const fetchUsers = () => {
        setLoading(true)

        fetch("/api/admin/users")
            .then(res => res.json())
            .then(data => setUsers(data))
            .finally(() => setLoading(false))
    }

    return (
        <section className="gap-4 flex flex-col h-full">
            <div className="w-full p-4 rounded-lg bg-white h-full relative">
                <Loading loading={loading} />
                <Table data={users} columns={columns} />
            </div>
        </section>
    )
}