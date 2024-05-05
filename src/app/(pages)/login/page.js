"use client"

import LoadingIcon from "@/components/icons/LoadingIcon"
import { useState } from "react"
import toast from "react-hot-toast"

export default function Login() {

    const [loading, setLoading] = useState(false)
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
    const [step, setStep] = useState(1)
    const [phone, setPhone] = useState('')
    const [otp1, setOtp1] = useState('')
    const [otp2, setOtp2] = useState('')
    const [otp3, setOtp3] = useState('')
    const [otp4, setOtp4] = useState('')

    const getOtp = async ({ resend = false }) => {
        setLoading(true)

        const getOtpPromise = new Promise(async (resolve, reject) => {

            const res = await fetch("/api/auth/get-otp", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, resend }),
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
            .then(() => setStep(2))
            .finally(() => setLoading(false))
    }

    const checkOtp = async () => {
        setLoading(true);

        let code = '';
        [otp1, otp2, otp3, otp4].map(states => {
            code += states
        })
        
        const checkOtpPromise = new Promise(async (resolve, reject) => {

            const res = await fetch("/api/auth/check-otp", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, code}),
            })

            res.ok ? resolve() : reject()
        })

        await toast.promise(
            checkOtpPromise,
            {
                loading: 'در حال بررسی کد تایید',
                success: 'کد تایید با موفقیت بررسی شد',
                error: 'مشکلی به وجود آمده، بار دیگر امتحان کنید.',
            }
        )
            .finally(() => setLoading(false))
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
                                <p>{steps[step - 1]?.description}</p>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-8">
                            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs" dir="ltr">
                                {
                                    step === 1 && (
                                        <div className="w-full h-11">
                                            <input placeholder="شماره همراه" type="text" value={phone} onChange={e => setPhone(e.target.value)} />
                                        </div>
                                    )
                                }
                                {
                                    step === 2 && (
                                        <>
                                            <div className="w-16 h-16 ">
                                                <input className="otp" value={otp1} onChange={e => setOtp1(e.target.value)} type="text" />
                                            </div>
                                            <div className="w-16 h-16 ">
                                                <input className="otp" value={otp2} onChange={e => setOtp2(e.target.value)} type="text" />
                                            </div>
                                            <div className="w-16 h-16 ">
                                                <input className="otp" value={otp3} onChange={e => setOtp3(e.target.value)} type="text" />
                                            </div>
                                            <div className="w-16 h-16 ">
                                                <input className="otp" value={otp4} onChange={e => setOtp4(e.target.value)} type="text" />
                                            </div>
                                        </>
                                    )
                                }
                            </div>

                            <div className="flex flex-col space-y-5">
                                <div>
                                    {
                                        step === 1 && (
                                            <button className="submit w-full rounded-xl" onClick={getOtp}>
                                                {steps[step - 1]?.buttonText}
                                            </button>
                                        )
                                    }
                                    {
                                        step === 2 && (
                                            <button className="submit w-full rounded-xl" onClick={checkOtp}>
                                                {steps[step - 1]?.buttonText}
                                            </button>
                                        )
                                    }
                                </div>

                                {
                                    step === 2 && (
                                        <div className="flex flex-row gap-2 items-center justify-center text-center text-sm font-mediums text-gray-500">
                                            <p>کد برای شما ارسال نشد؟</p>
                                            <p className="flex flex-row items-center text-primary font-semibold cursor-pointer" onClick={() => getOtp({ resend: true })}>ارسال دوباره</p>
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