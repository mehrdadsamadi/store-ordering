"use client"

import CustomEditor from "@/components/common/CustomEditor";
import EditableImage from "@/components/common/EditableImage";
import Loading from "@/components/common/Loading";
import { useEffect, useState } from "react";

export default function CreateProduct() {

    const [images, setImages] = useState([])
    const [name, setName] = useState("")
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [slug, setSlug] = useState("")
    const [wholesale_quantity, setWholesale_quantity] = useState(0)
    const [wholesale_price, setWholesale_price] = useState('')
    const [retail_price, setRetail_price] = useState('')
    const [available, setAvailable] = useState(false)

    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchBrands()
        fetchCategories()
    }, [])

    const fetchBrands = () => {
        setLoading(true)

        fetch(`/api/admin/brands`)
            .then(res => res.json())
            .then(data => setBrands(data))
            .finally(() => setLoading(false))
    }

    const fetchCategories = (name, setFunc) => {
        setLoading(true)

        fetch(`/api/admin/categories`)
            .then(res => res.json())
            .then(data => setCategories(data))
            .finally(() => setLoading(false))
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
                <Loading loading={loading}/>
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
                                                    <option key={b._id} value={b.name}>{b.name}</option>
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
                                                    <option key={c._id} value={c.name}>{c.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="">اسلاگ</label>
                                <div className="h-11">
                                    <input type="text" value={slug} onChange={e => setSlug(e.target.value)} placeholder="اسلاگ" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label htmlFor="">تایین مقدار عمده فروشی</label>
                                    <div className="h-11">
                                        <input type="number" value={wholesale_quantity} onChange={e => setWholesale_quantity(e.target.value)} placeholder="تایین مقدار عمده فروشی" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="">تایین قیمت عمده فروشی</label>
                                    <div className="h-11">
                                        <input type="text" value={wholesale_price} onChange={e => setWholesale_price(e.target.value)} placeholder="تایین قیمت عمده فروشی" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 items-center">
                                <div>
                                    <label htmlFor="">قیمت محصول در حالت تک فروشی</label>
                                    <div className="h-11">
                                        <input type="text" value={retail_price} onChange={e => setRetail_price(e.target.value)} placeholder="قیمت محصول در حالت تک فروشی" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor=""></label>
                                    <div className="flex items-center me-4">
                                        <input id="red-checkbox" type="checkbox" value={available} onChange={e => setAvailable(false)} className="w-5 h-5 text-primary bg-gray-100 border-gray-300 rounded overflow-hidden" />
                                        <label htmlFor="red-checkbox" className="ms-2 font-medium text-primary">محصول موجود است</label>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div>
                            <CustomEditor />
                        </div>
                    </div>
                </form>
                <button disabled className="w-full" type="button">ایجاد محصول</button>
            </div>
        </section>
    )
}