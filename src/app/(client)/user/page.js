"use client"

import Tooltip from "@/components/common/Tooltip"
import { formatPriceNumber } from "@/helpers/formatPriceInput"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function UserPage() {
    const [products, setProducts] = useState([])
    const [selectedFeature, setSelectedFeature] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = () => {
        setLoading(true)

        fetch("/api/products")
            .then(res => res.json())
            .then(data => { setProducts(data); console.log(data); })
            .finally(() => setLoading(false))
    }

    return (
        products?.length > 0 && (
            <div className="grid grid-cols-6 ">
                {
                    products.map(pr => (
                        <div key={pr?._id} className="flex-shrink-0 mx-auto relative overflow-hidden bg-primary rounded-lg max-w-xs shadow-lg">
                            <svg className="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none"
                                style={{ transform: "scale(1.5)", opacity: "0.1" }}>
                                <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white" />
                                <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white" />
                            </svg>
                            <div className="relative pt-10 px-10 flex items-center justify-center">
                                <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                                    style={{ background: "radial-gradient(black, transparent 60%)", transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)", opacity: "0.2" }}>
                                </div>
                                <Image className="relative w-40 rounded-lg" width={160} height={160} src={pr.images?.[0] ? pr.images?.[0] : `/placeholders/img-placeholder.webp`} alt="" />
                            </div>
                            <div className="relative text-white px-6 pb-6 mt-6">
                                <span className="block opacity-75 -mb-1">
                                    {pr?.features?.features?.map(fts => (
                                        <div key={fts._id} className="flex flex-col">
                                            <p>{fts.featureTitle}</p>
                                            <div className="flex gap-2">
                                                {
                                                    fts.features.map(ftItem => (
                                                        <Tooltip key={ftItem._id} text={ftItem.name} direction="down">
                                                            <Image className="relative !h-[40px] rounded-full cursor-pointer" onClick={() => setSelectedFeature(ftItem)} width={40} height={40} src={ftItem.image ? ftItem.image : `/placeholders/img-placeholder.webp`} alt="" />
                                                        </Tooltip>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    ))}
                                </span>
                                <span className="block font-semibold mb-2 mt-4">{pr.name}</span>
                                <button type="button" className="w-full">
                                    {
                                        selectedFeature ? `${formatPriceNumber(selectedFeature.wholesale_price)} تومان` : "یک گزینه را انتخاب کنید"
                                    }
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    )
}