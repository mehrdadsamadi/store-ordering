"use client"

import { motion } from "framer-motion"
import EditableImage from "@/components/common/EditableImage"
import ArrowRightIcon from "@/components/icons/ArrowRightIcon"
import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon"
import Image from "next/image"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Loading from "@/components/common/Loading"
import Dialog from "@/components/common/Dialog"
import Alert from "@/components/common/Alert"

export default function Categories() {

    const [showDialog, setShowDialog] = useState(false)
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const [fixCategories, setFixCategories] = useState([])
    const [categoryImage, setCategoryImage] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [categoryParentsId, setCategoryParentsId] = useState([])
    const [currentClickedCategoryData, setCurrentClickedCategoryData] = useState(null)

    useEffect(() => {
        setLoading(true)
        fetchCategories()
    }, [])

    useEffect(() => {
        getCategoriesUnderParent()
    }, [categoryParentsId])

    const fetchCategories = () => {
        // setLoading(true)

        fetch("/api/admin/categories")
            .then(res => res.json())
            .then(data => {
                setFixCategories(data)
                setCategories(data.filter(c => c.parent === undefined))
            })
            .finally(() => setLoading(false))
    }

    const getCategoriesUnderParent = () => {
        if (categoryParentsId?.length > 0) {
            // setLoading(true)

            fetch("/api/admin/categories/" + categoryParentsId[categoryParentsId.length - 1])
                .then(res => res.json())
                .then(data => setCategories(data))
            // .finally(() => setLoading(false))
        } else {
            fetchCategories()
        }
    }

    const handleShowDialog = () => {
        if (!showDialog) {
            setShowDialog(true)
        }
    }

    const handleCloseDialog = () => {
        setCategoryImage('')
        setCategoryName('')
        setShowDialog(false)
    }

    const handleCategoryClick = (categoryId) => {
        setCurrentClickedCategoryData(categories.find(c => c._id === categoryId))
        setCategoryParentsId(prev => [...prev, categoryId])
    }

    const handleBackClick = () => {
        setCategoryParentsId(prev => categoryParentsId.filter(c => c._id !== prev.pop()))
    }

    const handleCreateCategory = async () => {
        const createCategoryPromise = new Promise(async (resolve, reject) => {
            const data = { name: categoryName, image: categoryImage, parent: currentClickedCategoryData?._id }

            const res = await fetch("/api/admin/categories", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            handleCloseDialog()
            fetchCategories()

            const body = await res.json()
            res.ok ? resolve(body) : reject(body)
        })

        await toast.promise(
            createCategoryPromise,
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
                <button className="submit" onClick={handleShowDialog}>ایجاد دسته بندی</button>

                <div className="flex items-center gap-2">
                    <input type="text" className="!mb-0" placeholder="جستجو دسته بندی" />
                    <button>جستجو</button>
                </div>
            </div>
            <div className="w-full p-4 rounded-lg bg-white h-full relative">
                {
                    categoryParentsId?.length > 0 && (
                        <div className="flex gap-2 mb-4">
                            <button className="rounded-md flex items-center" onClick={handleBackClick}>
                                <ArrowRightIcon />
                                <p>برگرد عقب</p>
                            </button>
                            <nav className="flex px-5 py-3 text-primary border border-gray-300 rounded-lg" aria-label="Breadcrumb">
                                <ol className="inline-flex items-center">
                                    {
                                        categoryParentsId.map((pId, index) => (
                                            <li className="" key={index}>
                                                <span className="flex items-center text-sm font-medium text-gray-500">
                                                    {
                                                        index !== 0 && (
                                                            <div className="mx-2">
                                                                <ChevronLeftIcon />
                                                            </div>
                                                        )
                                                    }
                                                    {fixCategories.find(c => c._id === pId)?.name}
                                                </span>
                                            </li>
                                        ))
                                    }
                                </ol>
                            </nav>
                        </div>
                    )
                }
                {
                    categories?.length > 0 ? (
                        <motion.div
                            className="grid grid-cols-6 gap-2 categories-container"
                            initial={{ x: -200, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ ease: "linear", duration: 0.5 }}
                            key={categoryParentsId[categoryParentsId.length - 1]}
                        >
                            {
                                categories.map(category => (
                                    <div key={category._id} onClick={() => handleCategoryClick(category._id)} className="grid grid-cols-3 items-center p-4 bg-gray-200 rounded-md cursor-pointer">
                                        <Image src={category?.image || "/placeholders/img-placeholder.webp"} alt="category image" className="rounded-full w-[60px] h-[60px]" width={60} height={60} />
                                        <div className="col-span-2 flex justify-between items-center">
                                            <h3>{category.name}</h3>
                                            <ChevronLeftIcon />
                                        </div>
                                    </div>
                                ))
                            }
                        </motion.div>
                    ) : (
                        <Alert text="تا کنون دسته بندی اضافه نشده است"/>
                    )
                }
                <Loading loading={loading} />
                <Dialog showDialog={showDialog} setShowDialog={setShowDialog} title="ایجاد دسته بندی" onSubmit={handleCreateCategory} onClose={handleCloseDialog}>
                    <div className="w-[300px] h-[200px]">
                        <EditableImage link={categoryImage} setLink={setCategoryImage} folder="categories" />
                    </div>

                    <div className="my-4 flex flex-col gap-2">
                        <div className="h-11">
                            <input type="text" value={categoryName} onChange={e => setCategoryName(e.target.value)} placeholder="نام دسته بندی" />
                        </div>

                        <div className="h-11">
                            <input type="text" value={currentClickedCategoryData?.name} placeholder="دسته بندی پدر" disabled />
                        </div>
                    </div>
                </Dialog>
            </div>
        </section>
    )
}