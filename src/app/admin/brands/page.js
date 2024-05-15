"use client"
import { motion } from "framer-motion"
import Dialog from "@/components/common/Dialog"
import EditableImage from "@/components/common/EditableImage"
import Loading from "@/components/common/Loading"
import { useEffect, useState } from "react"
import Image from "next/image"
import toast from "react-hot-toast"

export default function Brands() {
    const [showDialog, setShowDialog] = useState(false)
    const [loading, setLoading] = useState(true)
    const [brands, setBrands] = useState([])
    const [brandImage, setBrandImage] = useState('')
    const [brandName, setBrandName] = useState('')

    useEffect(() => {
        fetchBrands()
    }, [])

    const fetchBrands = () => {
        setLoading(true)

        fetch("/api/admin/brands")
            .then(res => res.json())
            .then(data => setBrands(data))
            .finally(() => setLoading(false))
    }

    const handleShowDialog = () => {
        if (!showDialog) {
            setShowDialog(true)
        }
    }

    const handleCloseDialog = () => {
        setBrandImage('')
        setBrandName('')
        setShowDialog(false)
    }

    const handleCreateBrand = async () => {
        const createBrandPromise = new Promise(async (resolve, reject) => {
            const data = { name: brandName, image: brandImage }

            const res = await fetch("/api/admin/brands", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            handleCloseDialog()
            fetchBrands()

            const body = await res.json()
            res.ok ? resolve(body) : reject(body)
        })

        await toast.promise(
            createBrandPromise,
            {
                loading: 'در حال ایجاد دسته بندی ...',
                success: ({ message }) => message,
                error: ({ error }) => error,
            }
        )
    }
    return (
        <section className="gap-4 flex flex-col h-full">
            <div className="w-full p-4 rounded-lg bg-white flex justify-between">
                <button className="submit" onClick={handleShowDialog}>ایجاد برند</button>

                <div className="flex items-center gap-2">
                    <input type="text" className="!mb-0" placeholder="جستجو برند" />
                    <button>جستجو</button>
                </div>
            </div>
            <div className="w-full p-4 rounded-lg bg-white h-full relative">
                {
                    brands?.length > 0 && (
                        <motion.div
                            className="grid grid-cols-6 gap-2 brands-container"
                            initial={{ x: -200, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ ease: "linear", duration: 0.5 }}
                        >
                            {
                                brands.map(brand => (
                                    <div key={brand._id} className="grid grid-cols-3 items-center p-4 bg-gray-200 rounded-md">
                                        <Image src={brand.image} alt="brand image" className="rounded-full w-[60px] h-[60px]" width={60} height={60} />
                                        <h3 className="col-span-2">{brand.name}</h3>
                                    </div>
                                ))
                            }
                        </motion.div>
                    )
                }
                <Loading loading={loading} />
                <Dialog showDialog={showDialog} setShowDialog={setShowDialog} title="ایجاد برند" onSubmit={handleCreateBrand} onClose={handleCloseDialog}>
                    <div className="w-[300px] h-[200px]">
                        <EditableImage link={brandImage} setLink={setBrandImage} folder="brands" />
                    </div>

                    <div className="my-4 flex flex-col gap-2">
                        <div className="h-11">
                            <input type="text" value={brandName} onChange={e => setBrandName(e.target.value)} placeholder="نام برند" />
                        </div>
                    </div>
                </Dialog>
            </div>
        </section>
    )
}