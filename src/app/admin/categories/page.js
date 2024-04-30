"use client"

import EditableImage from "@/components/common/EditableImage"
import ArrowRightIcon from "@/components/icons/ArrowRightIcon"
import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon"
import LoadingIcon from "@/components/icons/LoadingIcon"
import Image from "next/image"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function Categories() {

    const [showPopup, setShowPopup] = useState(false)
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const [categoryImage, setCategoryImage] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [categoryParentsId, setCategoryParentsId] = useState([])

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        getCategoriesUnderParent()
    }, [categoryParentsId])

    const fetchCategories = () => {
        setLoading(true)

        fetch("/api/admin/categories")
            .then(res => res.json())
            .then(data => {
                setCategories(data.filter(c => c.parent === undefined))
            })
            .finally(() => setLoading(false))
    }

    const getCategoriesUnderParent = () => {
        if (categoryParentsId?.length > 0) {
            setLoading(true)

            fetch("/api/admin/categories/" + categoryParentsId[categoryParentsId.length - 1])
                .then(res => res.json())
                .then(data => setCategories(data))
                .finally(() => setLoading(false))
        } else {
            fetchCategories()
        }
    }

    const handleShowPopup = () => {
        if (!showPopup) {
            setShowPopup(true)
        }
    }

    const handleClosePopup = () => {
        setCategoryImage('')
        setCategoryName('')
        setCategoryParentsId('')
        setShowPopup(false)
    }

    const handleCategoryClick = (categoryId) => {
        setCategoryParentsId(prev => [...prev, categoryId])
    }

    const handleBackClick = () => {
        setCategoryParentsId(prev => categoryParentsId.filter(c => c._id !== prev.pop()))
    }

    const handleCreateCategory = async () => {
        const createCategoryPromise = new Promise(async (resolve, reject) => {
            const data = { name: categoryName, image: categoryImage, parent: categoryParentsId }

            const res = await fetch("/api/admin/categories", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            handleClosePopup()
            fetchCategories()

            res.ok ? resolve() : reject()
        })

        await toast.promise(
            createCategoryPromise,
            {
                loading: 'در حال ایجاد دسته بندی ...',
                success: 'دسته بندی با موفقیت ایجاد شد.',
                error: 'مشکلی به وجود آمده، بار دیگر امتحان کنید.',
            }
        )
    }


    return (
        <section className="gap-4 flex flex-col h-full">
            <div className="w-full p-4 rounded-lg bg-white flex justify-between">
                <button className="submit" onClick={handleShowPopup}>ایجاد دسته بندی</button>

                <div className="flex items-center gap-2">
                    <input type="text" className="!mb-0" placeholder="جستجو دسته بندی" />
                    <button>جستجو</button>
                </div>
            </div>
            <div className="w-full p-4 rounded-lg bg-white h-full relative">
                {
                    categoryParentsId?.length > 0 && (
                        <button className="rounded-md mb-4" onClick={handleBackClick}>
                            <ArrowRightIcon />
                            <p>برگرد عقب</p>
                        </button>
                    )
                }
                {
                    categories?.length > 0 && (
                        <div className="grid grid-cols-6 gap-2 categories-container">
                            {
                                categories.map(category => (
                                    <div key={category._id} onClick={() => handleCategoryClick(category._id)} className="grid grid-cols-3 items-center p-4 bg-gray-200 rounded-md cursor-pointer">
                                        <Image src={category.image} alt="category image" className="rounded-full w-[50px] h-[50px]" width={50} height={50} />
                                        <div className="col-span-2 flex justify-between">
                                            <h3>{category.name}</h3>
                                            <ChevronLeftIcon />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
                {
                    loading && (
                        <div className="inset-0 bg-black/20 flex items-center justify-center absolute rounded-md">
                            <div className="border border-gray-300 bg-gray-50/30 px-4 py-2 text-center text-gray-900 rounded-lg flex flex-col items-center justify-center">
                                <LoadingIcon />
                                <p className="mt-2 font-semibold cursor-default">منتظر بمانید</p>
                            </div>
                        </div>
                    )
                }
                {
                    showPopup && (
                        <div onClick={() => setShowPopup(false)} className="fixed inset-0 bg-black/30 flex items-center justify-center">
                            <div onClick={(e) => e.stopPropagation()} className="bg-white p-2 rounded-lg max-w-md">
                                <div className="overflow-y-auto p-2" style={{ maxHeight: 'calc(100vh - 100px)' }}>

                                    <EditableImage link={categoryImage} setLink={setCategoryImage} folder="categories" width={300} height={200} />

                                    <div className="my-4">
                                        <input type="text" value={categoryName} onChange={e => setCategoryName(e.target.value)} placeholder="نام دسته بندی" />

                                        <input type="text" value={categoryParentsId[categoryParentsId.length - 1]} onChange={e => setCategoryParentsId(e.target.value)} placeholder="دسته بندی پدر" disabled />
                                    </div>

                                    <div className="sticky bottom-0 flex items-center justify-between">
                                        <button type="button" onClick={handleCreateCategory} className="submit">ایجاد دسته بندی</button>
                                        <button type="button" onClick={handleClosePopup}>انصراف</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </section>
    )
}