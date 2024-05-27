"use client"

import CustomEditor from "@/components/common/CustomEditor";
import EditableImage from "@/components/common/EditableImage";
import Loading from "@/components/common/Loading";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CreateProduct({params: {productId}}) {

    const [images, setImages] = useState([])
    const [name, setName] = useState("")
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [slug, setSlug] = useState("")
    const [visible, setVisible] = useState(true)
    const [description, setDescription] = useState('<h1>در این قسمت میتوانید به صورت کامل توضیحات همراه با تصاویر برای محصول قرار دهید.</h1>')

    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(productId) {
            fetchProduct()
        }
        fetchBrands()
        fetchCategories()
    }, [productId])

    const fetchProduct = () => {
        setLoading(true)

        fetch(`/api/admin/products/${productId}`)
            .then(res => res.json())
            .then(data => {
                setBrand(data.brand._id)
                setCategory(data.category._id)
                setImages(data.images)
                setDescription(data.description)
                setName(data.name)
                setSlug(data.slug)
                setVisible(data.visible)
            })
            .finally(() => setLoading(false))
    }

    const fetchBrands = () => {
        setLoading(true)

        fetch(`/api/admin/brands`)
            .then(res => res.json())
            .then(data => {
                setBrands(data)
                setBrand(data[0]._id)
            })
            .finally(() => setLoading(false))
    }

    const fetchCategories = () => {
        setLoading(true)

        fetch(`/api/admin/categories`)
            .then(res => res.json())
            .then(data => {
                setCategories(data)
                setCategory(data[0]._id)
            })
            .finally(() => setLoading(false))
    }

    const handleCreateProduct = async () => {
        const createProductPromise = new Promise(async (resolve, reject) => {
            const data = { name, images, brand, category, slug, visible, description }

            const res = await fetch("/api/admin/products"+ (productId && `/${productId}`), {
                method: productId ? "PUT" : "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            resetStates()

            const body = await res.json()
            res.ok ? resolve(body) : reject(body)
        })

        await toast.promise(
            createProductPromise,
            {
                loading: productId ? "در حال ویرایش محصول..." : 'در حال ایجاد محصول ...',
                success: ({ message }) => message,
                error: ({ error }) => error,
            }
        )
    }

    const resetStates = () => {
        setImages([])
        setName("")
        setBrand("")
        setCategory("")
        setSlug("")
        setDescription('<h1>در این قسمت میتوانید به صورت کامل توضیحات همراه با تصاویر برای محصول قرار دهید.</h1>')
        setVisible(true)
    }

    const setImagesByPush = (imgPath, imgIndex) => {
        setImages(prevImg => {
            const newImages = [...prevImg]
            newImages[imgIndex] = imgPath
            return newImages
        })
    }

    const handleAddNewProductImage = () => {
        setImages(prevImgs => [...prevImgs, '/placeholders/img-placeholder.webp'])
    }

    return (
        <section className="h-full">
            <div className="w-full p-4 rounded-lg bg-white h-full relative flex flex-col justify-between">
                <Loading loading={loading} />
                <form>
                    <div className="p-4 bg-gray-200 rounded-lg overflow-x-auto grid grid-cols-6 items-center">
                        {
                            images?.length > 0 && images.map((img, index) => (
                                <div key={index} className="w-[200px] h-[200px]">
                                    <EditableImage link={img} setLink={(imgPath) => setImagesByPush(imgPath, index)} folder="products" />
                                </div>
                            ))
                        }
                        {
                            images?.length < 6 && (
                                <div>
                                    <button type="button" onClick={handleAddNewProductImage}>تصویر جدید</button>
                                </div>
                            )
                        }
                    </div>
                    <div className="grid grid-cols-2 gap-4 my-4">
                        <div className="flex flex-col gap-4">
                            <div>
                                <label htmlFor="">نام محصول</label>
                                <div className="h-11">
                                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="نام محصول" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label htmlFor="">برند محصول</label>
                                    <div className="h-11">
                                        <select className="px-2 pt-2" value={brand} onChange={e => setBrand(e.target.value)}>
                                            {
                                                brands?.length > 0 &&
                                                brands.map(b => (
                                                    <option key={b._id} value={b._id}>{b.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="">دسته بندی محصول</label>
                                    <div className="h-11">
                                        <select className="px-2 pt-2" value={category} onChange={e => setCategory(e.target.value)}>
                                            {
                                                categories?.length > 0 &&
                                                categories.map(c => (
                                                    <option key={c._id} value={c._id}>{c.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="">اسلاگ</label>
                                <div className="h-11">
                                    <input type="text" value={slug} onChange={e => setSlug(e.target.value.replace(" ", "-"))} placeholder="اسلاگ" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor=""></label>
                                <div className="flex items-center me-4">
                                    <input id="red-checkbox" type="checkbox" checked={visible} value={visible} onChange={e => setVisible(!visible)} className="w-5 h-5 text-primary bg-gray-100 border-gray-300 rounded overflow-hidden" />
                                    <label htmlFor="red-checkbox" className="ms-2 font-medium text-primary">این محصول قابل نمایش باشد؟</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <CustomEditor setData={setDescription} data={description} />
                        </div>
                    </div>
                </form>
                <button disabled={(images?.length === 0 || !brand || !category || !slug)} onClick={handleCreateProduct} className="w-full" type="button">
                    {productId ? "ویرایش محصول" : "ایجاد محصول"}
                </button>
            </div>
        </section>
    )
}