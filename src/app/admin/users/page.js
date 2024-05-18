"use client"

import Loading from "@/components/common/Loading";
import Table from "@/components/common/Table";
import { useEffect, useState } from "react";

export default function Users() {

    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchUsers()
    } , [])

    const fetchUsers = () => {
        setLoading(true)

        fetch("/api/admin/users")
            .then(res => res.json())
            .then(data => setUsers(data))
            .finally(() => setLoading(false))
    }

    return (
        <section className="gap-4 flex flex-col h-full">
            <div className="w-full p-4 rounded-lg bg-white flex justify-between">
                <button className="submit">ایجاد کاربر</button>

                <div className="flex items-center gap-2">
                    <input type="text" className="!mb-0" placeholder="جستجو کاربر" />
                    <button>جستجو</button>
                </div>
            </div>
            <div className="w-full p-4 rounded-lg bg-white h-full relative">
                <Loading loading={loading}/>
                <Table data={users} headers={['نام', 'نقش']}/>
            </div>
        </section>
    )
}