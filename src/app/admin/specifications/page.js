"use client"

import Loading from "@/components/common/Loading";
import Table from "@/components/common/Table";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Specifications() {
    
    const [loading, setLoading] = useState(true)
    const [specs, setSpecs] = useState([])

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
                <Table data={specs} headers={['بخش', 'عناوین مشخصات']}/>
            </div>
        </section>
    )
}