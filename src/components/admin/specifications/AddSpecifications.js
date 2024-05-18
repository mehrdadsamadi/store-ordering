"use client"

import { useState } from "react";
import TrashIcon from "@/components/icons/TrashIcon";
import ChevronUpIcon from "@/components/icons/ChevronUpIcon";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";

export default function AddSpecifications({ title, addLabel, props, onAddSubtitle, onRemoveSubtitle, onChangeSubtitle, onRemoveSpec }) {

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
                <button type="button" onClick={onRemoveSpec} className="border-none hover:bg-gray-300">
                    <TrashIcon />
                </button>
            </div>
            <div className={`${isOpen ? 'block' : 'hidden'} border-t border-t-gray-300 pt-2 mt-2`}>
                {
                    props?.length > 0 &&
                    props.map((spec, i) => (
                        <div key={i} className="flex items-center gap-2 mb-2">
                            <div>
                                <label>زیر عنوان</label>
                                <div className="h-11">
                                    <input className="!bg-gray-50" value={spec.subtitle} onChange={e => onChangeSubtitle(e.target.value, i, 'subtitle')} type="text" placeholder="نام زیر عنوان" />
                                </div>
                            </div>
                            <div>
                                <label>توضیحات</label>
                                <div className="h-11">
                                    <input className="!bg-gray-50" value={spec.desc} onChange={e => onChangeSubtitle(e.target.value, i, 'desc')} type="text" placeholder="توضیحات زیر عنوان" />
                                </div>
                            </div>
                            <div className="">
                                <label></label>
                                <button type="button" onClick={() => onRemoveSubtitle(i)} className="border-none hover:bg-gray-300">
                                    <TrashIcon />
                                </button>
                            </div>
                        </div>
                    ))
                }
                <button type="button" onClick={onAddSubtitle} className="w-full bg-white border-none mt-4">
                    <span>{addLabel}</span>
                </button>
            </div>
        </div>
    )
}