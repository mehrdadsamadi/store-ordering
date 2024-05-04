"use client"

import LoadingIcon from "@/components/icons/LoadingIcon"
import { useState } from "react"
import toast from "react-hot-toast"

export default function Login() {

    const [loading, setLoading] = useState(false)
    const [currentStep, setCurrentStep] = useState(1)
    const [phone, setPhone] = useState('')

    const getOtp = async ({resend = false}) => {

        setLoading(true)

        const getOtpPromise = new Promise(async (resolve, reject) => {

            const res = await fetch("/api/auth/get-otp", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({phone, resend}),
            })

            res.ok ? resolve() : reject()
        })

        await toast.promise(
            getOtpPromise,
            {
                loading: 'در حال ارسال کد تایید',
                success: 'کد تایید با موفقیت برای شما ارسال شد',
                error: 'مشکلی به وجود آمده، بار دیگر امتحان کنید.',
            }
        )

        setLoading(false)
        setCurrentStep(2)
    }

    const checkOtp = () => {
        
    }

    const [steps, setSteps] = useState([
        {
            step: 1,
            description: "شماره همراه خود را وارد کنید",
            buttonText: "ثبت و ادامه"
        },
        {
            step: 2,
            description: "کد ارسال شده به شماره همراه خود را وارد کنید",
            buttonText: "ثبت و ادامه"
        },
    ])

    const renderCurrentStep = () => {
        return steps.find(s => s.step === currentStep)
    }

    return (
        <section>
            <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
                <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
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
                    <div className="mx-auto flex w-full max-w-md flex-col space-y-8">
                        <div className="flex flex-col items-center justify-center text-center space-y-2">
                            <div className="font-semibold text-3xl">
                                <p>ورود / ثبت نام</p>
                            </div>
                            <div className="flex flex-row text-sm font-medium text-gray-400">
                                <p>{renderCurrentStep().description}</p>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-8">
                            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                                {
                                    currentStep === 1 && (
                                        <div className="w-full h-11">
                                            <input placeholder="شماره همراه" type="text" value={phone} onChange={e => setPhone(e.target.value)} />
                                        </div>
                                    )
                                }
                                {
                                    currentStep === 2 && (
                                        <>
                                            <div className="w-16 h-16 ">
                                                <input className="otp" type="text" />
                                            </div>
                                            <div className="w-16 h-16 ">
                                                <input className="otp" type="text" />
                                            </div>
                                            <div className="w-16 h-16 ">
                                                <input className="otp" type="text" />
                                            </div>
                                            <div className="w-16 h-16 ">
                                                <input className="otp" type="text" />
                                            </div>
                                        </>
                                    )
                                }
                            </div>

                            <div className="flex flex-col space-y-5">
                                <div>
                                    {
                                        currentStep === 1 && (
                                            <button className="submit w-full rounded-xl" onClick={getOtp}>
                                                {renderCurrentStep().buttonText}
                                            </button>
                                        )
                                    }
                                    {
                                        currentStep === 2 && (
                                            <button className="submit w-full rounded-xl" onClick={checkOtp}>
                                                {renderCurrentStep().buttonText}
                                            </button>
                                        )
                                    }
                                </div>

                                {
                                    currentStep === 2 && (
                                        <div className="flex flex-row gap-2 items-center justify-center text-center text-sm font-mediums text-gray-500">
                                            <p>کد برای شما ارسال نشد؟</p>
                                            <p className="flex flex-row items-center text-primary font-semibold cursor-pointer" onClick={getOtp({resend: true})}>ارسال دوباره</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}