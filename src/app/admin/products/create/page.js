"use client"

import EditableImage from "@/components/common/EditableImage";
import { useState } from "react";

export default function CreateProduct() {

    const [images, setImages] = useState([])

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
                <form>
                    <div className="p-4 bg-gray-200 rounded-lg overflow-x-auto grid grid-cols-6 items-center">
                        {
                            images?.length > 0 && images.map((img, index) => (
                                <div key={index} className="w-[200px] h-[200px]">
                                    <EditableImage link={img} setLink={(imgPath) => setImagesByPush(imgPath, index)} folder="products"/>
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
                </form>
                <button disabled className="w-full" type="button">ایجاد محصول</button>
            </div>
        </section>
    )
}