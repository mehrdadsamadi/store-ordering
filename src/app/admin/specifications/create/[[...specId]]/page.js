"use client"

import AddSpecifications from "@/components/admin/specifications/AddSpecifications";
import Alert from "@/components/common/Alert";
import Loading from "@/components/common/Loading";
import Stepper from "@/components/common/Stepper";
import Image from "next/image";
import { useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";

const specificationsReducer = (state, { type, payload }) => {
    switch (type) {
        case 'SET_SPECS':
            return payload;
        case 'RESET_SPECS':
            return [];
        case 'ADD_SPEC_TITLE':
            return [...state, { specTitle: payload, subtitles: [] }];
        case 'REMOVE_SPEC':
            const specs = [...state];
            const nSpecs = specs.filter((s, index) => index !== payload.specIndex)
            return nSpecs;
        case 'REMOVE_SPEC_SUBTITLE':
            const prevState = [...state];
            const newSubtitles = prevState[payload.specIndex].subtitles.filter((sub, index) => index !== payload.subtitleIndex)
            prevState[payload.specIndex].subtitles = newSubtitles
            return prevState;
        case 'ADD_SPEC_SUBTITLE':
            const newState = [...state];
            newState[payload.specIndex].subtitles.push({ subtitle: "", desc: "" });
            return newState;
        case 'CHANGE_SPEC_SUBTITLE':
            const { value, specIndex, inputName, subtitleIndex } = payload
            const newSpecs = [...state];
            newSpecs[specIndex].subtitles[subtitleIndex][inputName] = value;
            return newSpecs;
        default:
            return state;
    }
};

export default function CreateSpecifications({ params: { specId } }) {

    const [loading, setLoading] = useState(false)
    const [steps, setSteps] = useState([
        {
            step: 1,
            title: "انتخاب بخش",
            description: "مشخصات در کدام بخش اضافه شود؟"
        },
        {
            step: 2,
            title: "انتخاب نمونه",
            description: "مشخصات به کدام نمونه اضافه شود؟"
        },
        {
            step: 3,
            title: "ایجاد مشخصات",
            description: "مشخصات را ایجاد کنید"
        },
    ])
    const [activeStep, setActiveStep] = useState(1)
    const [selectedSection, setSelectedSection] = useState('')
    const [sectionItems, setSectionItems] = useState([])
    const [selectedItem, setSelectedItem] = useState()

    const [specTitle, setSpecTitle] = useState('')
    const [specifications, dispatch] = useReducer(specificationsReducer, []);

    useEffect(() => {
        if(specId) {
            fetchSpec()
        }
    }, [specId])

    useEffect(() => {
        if (selectedSection !== '') {
            setActiveStep(2)
            fetchSectionItems()
        }
    }, [selectedSection])

    const fetchSpec = () => {
        setLoading(true)

        fetch(`/api/admin/specifications/${specId}`)
            .then(res => res.json())
            .then(data => {
                dispatch({ type: 'SET_SPECS', payload: data.specifications });

                if(selectedSection === '') {
                    if(data?.product) {
                        setSelectedSection({ dataName: 'product', fetchName: 'products' })
                    } else if(data?.category) {
                        setSelectedSection({ dataName: 'category', fetchName: 'categories' })
                    } else {
                        setSelectedSection({ dataName: 'brand', fetchName: 'brands' })                    
                    }
                }
                setSelectedItem(data[selectedSection.dataName])
            })
            .finally(() => setLoading(false))
    }

    const fetchSectionItems = () => {
        setLoading(true)

        fetch(`/api/admin/${selectedSection?.fetchName}`)
            .then(res => res.json())
            .then(data => setSectionItems(data))
            .finally(() => setLoading(false))
    }

    const handleSubmitSpecs = async () => {
        const createSpecsPromise = new Promise(async (resolve, reject) => {

            let data = {}

            data[selectedSection?.dataName] = selectedItem._id
            data.specifications = specifications

            const res = await fetch("/api/admin/specifications"+(specId && `/${specId}`), {
                method: specId ? "PUT" : "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            setActiveStep(1)
            setSelectedSection('')
            setSelectedItem()
            setSectionItems([])
            dispatch({ type: 'RESET_SPECS' });

            const body = await res.json()
            res.ok ? resolve(body) : reject(body)
        })

        await toast.promise(
            createSpecsPromise,
            {
                loading: specId ? "در حال ویرایش مشخصات..." : 'در حال ایجاد مشخصات ...',
                success: ({ message }) => message,
                error: ({ error }) => error,
            }
        )
    }

    const handleAddSpecTitle = () => {
        dispatch({ type: 'ADD_SPEC_TITLE', payload: specTitle });
        setSpecTitle('')
    };

    const handleAddSpecSubtitles = (specIndex) => {
        dispatch({ type: 'ADD_SPEC_SUBTITLE', payload: { specIndex } });
    };

    const handleRemoveSpecSubtitle = (specIndex, subtitleIndex) => {
        dispatch({ type: 'REMOVE_SPEC_SUBTITLE', payload: { specIndex, subtitleIndex } });
    };

    const handleChangeSubtitle = (value, subtitleIndex, inputName, specIndex) => {
        dispatch({ type: 'CHANGE_SPEC_SUBTITLE', payload: { value, subtitleIndex, inputName, specIndex } });
    };

    const handleRmoveSpec = (specIndex) => {
        dispatch({ type: 'REMOVE_SPEC', payload: { specIndex } });
    };

    return (
        <section className="h-full">
            <div className="w-full p-4 rounded-lg bg-white h-full relative flex flex-col justify-between">
                <div className="p-4 h-full overflow-hidden">
                    <Stepper steps={steps} activeStep={activeStep} />

                    <div className="grid grid-cols-3 gap-4 mt-4 h-full">
                        <div className="flex flex-col items-center gap-4">
                            <div onClick={() => setSelectedSection({ dataName: 'product', fetchName: 'products' })} className="rounded-lg bg-gray-200 text-center w-40 p-4 hover:bg-gray-300 cursor-pointer">محصول</div>
                            <div onClick={() => setSelectedSection({ dataName: 'category', fetchName: 'categories' })} className="rounded-lg bg-gray-200 text-center w-40 p-4 hover:bg-gray-300 cursor-pointer">دسته بندی</div>
                            <div onClick={() => setSelectedSection({ dataName: 'brand', fetchName: 'brands' })} className="rounded-lg bg-gray-200 text-center w-40 p-4 hover:bg-gray-300 cursor-pointer">برند</div>
                        </div>
                        <div className="relative overflow-y-auto">
                            <Loading loading={loading} />

                            {
                                sectionItems?.length === 0 && (
                                    <Alert text="ابتدا یک بخش را انتخاب کنید" />
                                )
                            }

                            <div className="grid grid-cols-2 gap-2 overflow-y-auto">
                                {
                                    sectionItems?.length > 0 && sectionItems.map(item => (
                                        <div key={item._id} onClick={() => { setSelectedItem(item); setActiveStep(3) }} className={`grid grid-cols-3 items-center px-4 py-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 ${item._id === selectedItem?._id && 'border border-primary'}`}>
                                            <Image src={item?.image || item?.images?.[0] || "/placeholders/img-placeholder.webp"} alt="item image" className="rounded-full w-[60px] h-[60px]" width={60} height={60} />
                                            <h3 className="col-span-2">{item.name}</h3>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="relative overflow-y-auto">
                            {
                                (!selectedItem && !specId) ? (
                                    <Alert text="ابتدا یک نمونه را انتخاب کنید" />
                                ) : (
                                    <div className="h-full">
                                        <div className="w-full text-center font-semibold mb-2">
                                            <p>
                                                ایجاد مشخصات برای
                                                {(selectedSection.fetchName === "products") ? " محصول " : (selectedSection.fetchName === "brands") ? " برند " : " دسته بندی "}
                                                {selectedItem?.name}
                                            </p>
                                        </div>
                                        <div className="flex gap-2 mb-2">
                                            <div className="h-11 grow">
                                                <input type="text" placeholder="عنوان" value={specTitle} onChange={(e) => setSpecTitle(e.target.value)} />
                                            </div>
                                            <button type="button" disabled={!specTitle} onClick={handleAddSpecTitle}>ایجاد عنوان</button>
                                        </div>
                                        <div className="overflow-y-auto h-full">
                                            {
                                                specifications?.length > 0 && specifications.map((spec, index) => (
                                                    <AddSpecifications key={index} title={spec.specTitle} addLabel={`ایجاد زیر عنوان برای ${spec.specTitle}`} props={spec.subtitles} onRemoveSpec={() => handleRmoveSpec(index)} onChangeSubtitle={(value, subtitleIndex, inputName) => handleChangeSubtitle(value, subtitleIndex, inputName, index)} onRemoveSubtitle={(subtitleIndex) => handleRemoveSpecSubtitle(index, subtitleIndex)} onAddSubtitle={() => handleAddSpecSubtitles(index)} />
                                                ))
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                </div>

                <button disabled={!specifications?.length} onClick={handleSubmitSpecs} className="w-full" type="button">
                    {specId ? "ویرایش مشخصات" : "ثبت مشخصات"}
                </button>
            </div>
        </section>
    )
}