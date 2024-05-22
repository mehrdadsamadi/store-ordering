"use client"

import Loading from "@/components/common/Loading";
import Table from "@/components/common/Table";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Specifications() {
    
    const [loading, setLoading] = useState(true)
    const [features, setFeatures] = useState([])

    useEffect(() => {
        fetchFeatures()
    }, [])

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

                <div className="flex items-center gap-2">
                    <input type="text" className="!mb-0" placeholder="جستجو ویژگی" />
                    <button>جستجو</button>
                </div>
            </div>
            <div className="w-full p-4 rounded-lg bg-white h-full relative">
                <Loading loading={loading} />
                <Table data={features} headers={['بخش', 'عناوین ویژگی']}/>
            </div>
        </section>
    )
}