"use client"

import { useState } from "react";
import TrashIcon from "@/components/icons/TrashIcon";
import ChevronUpIcon from "@/components/icons/ChevronUpIcon";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import EditableImage from "@/components/common/EditableImage";
import { formatPriceNumber } from "@/helpers/formatPriceInput";

export default function AddFeatures({ title, addLabel, props, onAddFeature, onRemoveFeatureItem, onChangeFeature, onRemoveFeature }) {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="bg-gray-200 p-2 rounded-2xl mb-4">
            <div className="flex items-center justify-between">
                <button onClick={() => setIsOpen(prev => !prev)} type="button" className="p-1 border-0 justify-start">
                    {
                        isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />
                    }

                    <h3 className="text-gray-700 flex gap-1">
                        {title}
                        <span>({props?.length || 0})</span>
                    </h3>
                </button>
                <button type="button" onClick={onRemoveFeature} className="border-none hover:bg-gray-300">
                    <TrashIcon />
                </button>
            </div>
            <div className={`${isOpen ? 'block' : 'hidden'} border-t border-t-gray-300 pt-2 mt-2`}>
                {
                    props?.length > 0 &&
                    props.map((feature, i) => (
                        <div key={i} className="flex flex-col gap-4 ">
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label>نام</label>
                                    <div className="h-11">
                                        <input className="!bg-gray-50" value={feature.name} onChange={e => onChangeFeature(e.target.value, i, 'name')} type="text" placeholder="نام ویژگی" />
                                    </div>
                                </div>
                                <div>
                                    <label>متن</label>
                                    <div className="h-11">
                                        <input className="!bg-gray-50" value={feature.amount} onChange={e => onChangeFeature(e.target.value, i, 'amount')} type="text" placeholder="متن ویژگی" />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label htmlFor="">تایین مقدار عمده فروشی</label>
                                    <div className="h-11">
                                        <input type="number" value={feature.wholesale_quantity} onChange={e => onChangeFeature(e.target.value, i, 'wholesale_quantity')} placeholder="تایین مقدار عمده فروشی" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="">تایین قیمت عمده فروشی</label>
                                    <div className="h-11">
                                        <input type="text" value={feature.wholesale_price} onChange={e => onChangeFeature(e.target.value, i, 'wholesale_price')} placeholder="تایین قیمت عمده فروشی" />
                                    </div>
                                    {
                                        feature.wholesale_price && (
                                            <p className="text-xs text-primary flex items-center mt-1">{formatPriceNumber(feature.wholesale_price)} تومان</p>
                                        )
                                    }
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 items-center">
                                <div>
                                    <label htmlFor="">قیمت محصول در حالت تک فروشی</label>
                                    <div className="h-11">
                                        <input type="text" value={feature.retail_price} onChange={e => onChangeFeature(e.target.value, i, 'retail_price')} placeholder="قیمت محصول در حالت تک فروشی" />
                                    </div>
                                    {
                                        feature.retail_price && (
                                            <p className="text-xs text-primary flex items-center mt-1">{formatPriceNumber(feature.retail_price)} تومان</p>
                                        )
                                    }
                                </div>
                                <div>
                                    <label htmlFor="">تعداد محصول در این ویژگی</label>
                                    <div className="h-11">
                                        <input type="text" value={feature.quantity} onChange={e => onChangeFeature(e.target.value, i, 'quantity')} placeholder="تعداد محصول در این ویژگی" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 items-center">
                                <div>
                                    <label htmlFor="">تصویر ویژگی</label>
                                    <div className="h-11 w-11">
                                        <EditableImage link={feature.image} setLink={path => onChangeFeature(path, i, 'image')} folder="features" rounded hiddenUploadText />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor=""></label>
                                    <div className="flex items-center me-4">
                                        <input id="red-checkbox" type="checkbox" checked={feature.available} value={feature.available} onChange={e => onChangeFeature(e.target.value, i, 'available')} className="w-5 h-5 text-primary bg-gray-100 border-gray-300 rounded overflow-hidden" />
                                        <label htmlFor="red-checkbox" className="ms-2 font-medium text-primary">محصول در این ویژگی موجود است</label>
                                    </div>
                                </div>
                            </div>

                            <button type="button" onClick={() => onRemoveFeatureItem(i)} className="hover:bg-gray-300 w-full">
                                <TrashIcon />
                            </button>
                        </div>
                    ))
                }
                <button type="button" onClick={onAddFeature} className="w-full bg-white border-none mt-4">
                    <span>{addLabel}</span>
                </button>
            </div>
        </div>
    )
}