import Alert from "@/components/common/Alert";
import Tooltip from "@/components/common/Tooltip";
import MinusIcon from "@/components/icons/MinusIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import { formatPriceNumber } from "@/helpers/formatPriceInput";
import { CartContext } from "@/prodviders/client/CartProvider";
import Image from "next/image";
import { useContext, useState } from "react";

export default function ProductCard({ product: pr }) {

    const { addToCart } = useContext(CartContext)

    const [selectedFeature, setSelectedFeature] = useState()
    const [retail_quantity, setRetail_quantity] = useState(0)
    const [wholesale_quantity, setWholesale_quantity] = useState(0)

    const handleQuantities = (setState, quantity) => {
        setState(prev => (prev + quantity) >= 0 ? (prev + quantity) : 0)
    }

    const handleAddToCart = () => {
        addToCart(pr, selectedFeature, {retail_quantity, wholesale_quantity})

        setSelectedFeature()
        setRetail_quantity(0)
        setWholesale_quantity(0)
    }

    return (
        <div className="flex-shrink-0 mx-auto relative overflow-hidden bg-primary rounded-lg w-full shadow-lg">
            <svg className="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none"
                style={{ transform: "scale(1.5)", opacity: "0.1" }}>
                <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white" />
                <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white" />
            </svg>
            <div className="relative pt-10 px-10 flex items-center justify-center">
                <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                    style={{ background: "radial-gradient(black, transparent 60%)", transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)", opacity: "0.2" }}>
                </div>
                <Image className="relative w-40 h-40 rounded-lg" width={160} height={160} src={pr.images?.[0] ? pr.images?.[0] : `/placeholders/img-placeholder.webp`} alt="" />
            </div>
            <div className="relative text-white px-6 pb-6 mt-6">
                <span className="block opacity-75 -mb-1">
                    {pr?.features?.features?.map(fts => (
                        <div key={fts._id} className="flex flex-col">
                            <p>{fts.featureTitle}</p>
                            <div className="flex gap-2">
                                {
                                    fts.features.map(ftItem => (
                                        <Tooltip key={ftItem._id} text={ftItem.name} direction="down">
                                            <Image className={`relative !h-[40px] rounded-full cursor-pointer ${selectedFeature?._id === ftItem._id && 'border-2'}`} onClick={() => setSelectedFeature(ftItem)} width={40} height={40} src={ftItem.image ? ftItem.image : `/placeholders/img-placeholder.webp`} alt="" />
                                        </Tooltip>
                                    ))
                                }
                            </div>
                        </div>
                    ))}
                </span>
                <span className="block font-semibold my-4 h-12">{pr.name}</span>
                {
                    selectedFeature ? (
                        <div className="flex flex-col gap-4">
                            <div>
                                <p className="mb-1">خرید عمده ({selectedFeature?.wholesale_quantity} عدد)</p>
                                <div className="relative flex items-center w-full gap-2 mt-2">
                                    <button type="button" onClick={() => handleQuantities(setWholesale_quantity, -selectedFeature?.wholesale_quantity)} id="decrement-button" data-input-counter-decrement="bedrooms-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                        <MinusIcon />
                                    </button>
                                    <div>
                                        <div className="h-11">
                                            <input type="text" className="z-10 text-black" value={wholesale_quantity} />
                                        </div>
                                        <div className="absolute bottom-0 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex grow items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse">
                                            <span>عدد</span>
                                        </div>
                                    </div>
                                    <button type="button" onClick={() => handleQuantities(setWholesale_quantity, selectedFeature?.wholesale_quantity)} id="increment-button" data-input-counter-increment="bedrooms-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                        <PlusIcon />
                                    </button>
                                </div>
                                <p className="mt-1 text-center text-sm">هر عدد {formatPriceNumber(selectedFeature?.wholesale_price)} تومان</p>
                            </div>
                            <div>
                                <p className="mb-1">خرید خرده (1 عدد)</p>
                                <div className="relative flex items-center w-full gap-2 mt-2">
                                    <button type="button" onClick={() => handleQuantities(setRetail_quantity, -1)} id="decrement-button" data-input-counter-decrement="bedrooms-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                        <MinusIcon />
                                    </button>
                                    <div>
                                        <div className="h-11">
                                            <input type="text" className="z-10 text-black" value={retail_quantity} />
                                        </div>
                                        <div className="absolute bottom-0 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex grow items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse">
                                            <span>عدد</span>
                                        </div>
                                    </div>
                                    <button type="button" onClick={() => handleQuantities(setRetail_quantity, 1)} id="increment-button" data-input-counter-increment="bedrooms-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                        <PlusIcon />
                                    </button>
                                </div>
                                <p className="mt-1 text-center text-sm">هر عدد {formatPriceNumber(selectedFeature?.retail_price)} تومان</p>
                            </div>

                            {
                                (wholesale_quantity > 0 || retail_quantity > 0) && (
                                    <div className="w-full">
                                        <button type="button" onClick={handleAddToCart} className="w-full hover:bg-gray-50/10">افزودن به سبد خرید</button>
                                    </div>
                                )
                            }
                        </div>
                    ) : (
                        <Alert text="یک گزینه را انتخاب کنید" />
                    )
                }
            </div>
        </div>
    )
} 