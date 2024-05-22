"use client"

import AddFeatures from "@/components/admin/features/AddFeatures";
import Alert from "@/components/common/Alert";
import Loading from "@/components/common/Loading";
import Stepper from "@/components/common/Stepper";
import Image from "next/image";
import { useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";

const featuresReducer = (state, { type, payload }) => {
    switch (type) {
        case 'RESET_FEATURES':
            return [];
        case 'ADD_FEATURE_TITLE':
            return [...state, { featureTitle: payload, features: [] }];
        case 'REMOVE_FEATURE':
            const specs = [...state];
            const nSpecs = specs.filter((s, index) => index !== payload.featureIndex)
            return nSpecs;
        case 'REMOVE_FEATURE_ITEM':
            const prevState = [...state];
            const newSubtitles = prevState[payload.featureIndex].features.filter((sub, index) => index !== payload.featureItemIndex)
            prevState[payload.featureIndex].features = newSubtitles
            return prevState;
        case 'ADD_FEATURE_ITEM':
            const newState = [...state];
            newState[payload.featureIndex].features.push({ name: "", amount: "", image: "/placeholders/img-placeholder.webp", wholesale_quantity: 0, wholesale_price: "", retail_price: "", available: true, quantity: 0 });
            return newState;
        case 'CHANGE_FEATURE_ITEM':
            const { value, featureIndex, inputName, featureItemIndex } = payload
            const newSpecs = [...state];
            newSpecs[featureIndex].features[featureItemIndex][inputName] = value;
            return newSpecs;
        default:
            return state;
    }
};

export default function CreateFeatures() {

    const [loading, setLoading] = useState(false)
    const [steps, setSteps] = useState([
        {
            step: 1,
            title: "انتخاب محصول",
            description: "ویژگی ها به کدام محصول اضافه شود؟"
        },
        {
            step: 2,
            title: "ایجاد ویژگی ها",
            description: "ویژگی ها را ایجاد کنید"
        },
    ])
    const [activeStep, setActiveStep] = useState(1)
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState()

    const [featureTitle, setFeatureTitle] = useState('')
    const [features, dispatch] = useReducer(featuresReducer, []);

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = () => {
        setLoading(true)

        fetch(`/api/admin/products`)
            .then(res => res.json())
            .then(data => setProducts(data))
            .finally(() => setLoading(false))
    }

    const handleSubmitFeatures = async () => {
        const createFeaturesPromise = new Promise(async (resolve, reject) => {

            let data = {}

            data.product = selectedProduct._id
            data.features = features

            const res = await fetch("/api/admin/features", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            setActiveStep(1)
            setSelectedProduct()
            dispatch({ type: 'RESET_FEATURES' });

            const body = await res.json()
            res.ok ? resolve(body) : reject(body)
        })

        await toast.promise(
            createFeaturesPromise,
            {
                loading: 'در حال ایجاد ویژگی ها ...',
                success: ({ message }) => message,
                error: ({ error }) => error,
            }
        )
    }

    const handleAddFeatureTitle = () => {
        dispatch({ type: 'ADD_FEATURE_TITLE', payload: featureTitle });
        setFeatureTitle('')
    };

    const handleAddFeatureItem = (featureIndex) => {
        dispatch({ type: 'ADD_FEATURE_ITEM', payload: { featureIndex } });
    };

    const handleRemoveFeatureItem = (featureIndex, featureItemIndex) => {
        dispatch({ type: 'REMOVE_FEATURE_ITEM', payload: { featureIndex, featureItemIndex } });
    };

    const handleChangeFeatureItem = (value, featureItemIndex, inputName, featureIndex) => {
        dispatch({ type: 'CHANGE_FEATURE_ITEM', payload: { value, featureItemIndex, inputName, featureIndex } });
    };

    const handleRmoveFeature = (featureIndex) => {
        dispatch({ type: 'REMOVE_FEATURE', payload: { featureIndex } });
    };

    return (
        <section className="h-full">
            <div className="w-full p-4 rounded-lg bg-white h-full relative flex flex-col justify-between">
                <div className="p-4 h-full overflow-hidden">
                    <Stepper steps={steps} activeStep={activeStep} />

                    <div className="grid grid-cols-3 gap-4 mt-4 h-full">
                        <div className="relative overflow-y-auto">
                            <Loading loading={loading} />

                            <div className="grid grid-cols-2 gap-2 overflow-y-auto">
                                {
                                    products?.length > 0 && products.map(item => (
                                        <div key={item._id} onClick={() => { setSelectedProduct(item); setActiveStep(2) }} className="grid grid-cols-3 items-center px-4 py-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300">
                                            <Image src={item.images[0]} alt="item image" className="rounded-full w-[60px] h-[60px]" width={60} height={60} />
                                            <h3 className="col-span-2">{item.name}</h3>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="relative overflow-y-auto col-span-2 mb-16">
                            {
                                !selectedProduct ? (
                                    <Alert text="ابتدا یک محصول را انتخاب کنید" />
                                ) : (
                                    <div className="h-full">
                                        <div className="w-full text-center font-semibold mb-2">
                                            <p>
                                                ایجاد ویژگی برای
                                                {" " + selectedProduct.name}
                                            </p>
                                        </div>
                                        <div className="flex gap-2 mb-2">
                                            <div className="h-11 grow">
                                                <input type="text" placeholder="عنوان" value={featureTitle} onChange={(e) => setFeatureTitle(e.target.value)} />
                                            </div>
                                            <button type="button" disabled={!featureTitle} onClick={handleAddFeatureTitle}>ایجاد عنوان</button>
                                        </div>
                                        <div className="overflow-y-auto h-full">
                                            {
                                                features?.length > 0 && features.map((feature, index) => (
                                                    <AddFeatures
                                                        key={index}
                                                        title={feature.featureTitle}
                                                        addLabel={`ایجاد ویژگی برای ${feature.featureTitle}`}
                                                        props={feature.features}
                                                        onRemoveFeature={() => handleRmoveFeature(index)}
                                                        onChangeFeature={(value, featureIndex, inputName) => handleChangeFeatureItem(value, featureIndex, inputName, index)}
                                                        onRemoveFeatureItem={(featureIndex) => handleRemoveFeatureItem(index, featureIndex)}
                                                        onAddFeature={() => handleAddFeatureItem(index)}
                                                    />
                                                ))
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                </div>

                <button disabled={!features?.length} onClick={handleSubmitFeatures} className="w-full" type="button">ثبت مشخصات</button>
            </div>
        </section>
    )
}