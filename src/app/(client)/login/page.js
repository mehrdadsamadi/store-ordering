"use client"

import { motion } from "framer-motion"
import useCountDown from 'react-countdown-hook';
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation";
import ChooseRole from "@/components/client/login/chooseRole";
import { ROLES } from "@/helpers/roles";
import { getClientSession } from "@/helpers/sessions";
import Loading from "@/components/common/Loading";

export default function Login() {

    const { push } = useRouter()

    const [timeLeft, { start, pause, resume, reset }] = useCountDown(2 * 60 * 1000, 1000)

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
        {
            step: 3,
            description: "عنوان شغلی خود را انتخاب کنید",
            buttonText: "ثبت و ادامه"
        },
    ])
    const [step, setStep] = useState(1)
    const [phone, setPhone] = useState('')
    const [resendButton, setResendButton] = useState(false)

    const [otp1, setOtp1] = useState('')
    const [otp2, setOtp2] = useState('')
    const [otp3, setOtp3] = useState('')
    const [otp4, setOtp4] = useState('')

    const otp1Ref = useRef()
    const otp2Ref = useRef()
    const otp3Ref = useRef()
    const otp4Ref = useRef()

    useLayoutEffect(() => {
        getClientSession()
            .then(res => res.json())
            .then(user => {
                if (user)
                    return push("/")
            })
    }, [])

    useEffect(() => {
        if (step === 2) {
            start(2 * 60 * 1000)
        }
    }, [step])

    useEffect(() => {
        if (timeLeft === 1000) {
            setResendButton(true)
        }
    }, [timeLeft])

    const handleOtpInput = (e) => {
        const { target } = e;
        [['otp1', otp2Ref], ['otp2', otp3Ref], ['otp3', otp4Ref]].map((otps) => {
            if (target.id === otps[0]) {
                otps[1].current.focus()
            }
        })
    }

    const getOtp = async ({ resend = false }) => {
        setLoading(true)

        start(2 * 60 * 1000)
        setResendButton(false)

        const getOtpPromise = new Promise(async (resolve, reject) => {

            const res = await fetch("/api/auth/get-otp", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, resend }),
            })

            const body = await res.json()
            res.ok ? resolve(body) : reject(body)
        })

        await toast.promise(
            getOtpPromise,
            {
                loading: 'در حال ارسال کد تایید',
                success: ({ message }) => message,
                error: ({ error }) => error,
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
                body: JSON.stringify({ phone, code }),
            })

            const body = await res.json()
            if (res.ok) {
                resolve(body)
            } else {
                reject(body)
            }
        })

        await toast.promise(
            checkOtpPromise,
            {
                loading: 'در حال بررسی کد تایید',
                success: 'کد تایید با موفقیت بررسی شد',
                error: ({ error }) => error,
            }
        )
            .then((data) => {
                const { role } = data
                if (role && role !== ROLES.USER.name) {
                    return push("/")
                }
                setStep(3)
            })
            .finally(() => setLoading(false))
    }

    return (
        <section>
            <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
                <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                    <Loading loading={loading} />
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
                            <motion.div
                                className="flex flex-row items-center justify-between mx-auto w-full max-w-xs"
                                dir="ltr"
                                initial={{ x: -200, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ ease: "linear", duration: 0.5 }}
                                key={step}
                            >
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
                                                <input className="otp" id="otp1" ref={otp1Ref} value={otp1} onChange={e => { setOtp1(e.target.value); handleOtpInput(e) }} type="text" />
                                            </div>
                                            <div className="w-16 h-16 ">
                                                <input className="otp" id="otp2" ref={otp2Ref} value={otp2} onChange={e => { setOtp2(e.target.value); handleOtpInput(e) }} type="text" />
                                            </div>
                                            <div className="w-16 h-16 ">
                                                <input className="otp" id="otp3" ref={otp3Ref} value={otp3} onChange={e => { setOtp3(e.target.value); handleOtpInput(e) }} type="text" />
                                            </div>
                                            <div className="w-16 h-16 ">
                                                <input className="otp" id="otp4" ref={otp4Ref} value={otp4} onChange={e => { setOtp4(e.target.value); handleOtpInput(e) }} type="text" />
                                            </div>
                                        </>
                                    )
                                }
                                {
                                    step === 3 && (
                                        <ChooseRole setLoading={setLoading} phone={phone} />
                                    )
                                }
                            </motion.div>

                            {
                                step !== 3 && (
                                    <div className="flex flex-col space-y-5">
                                        <div>
                                            {
                                                step === 1 && (
                                                    <button className="submit w-full rounded-xl" disabled={phone.length !== 11} onClick={getOtp}>
                                                        {steps[step - 1]?.buttonText}
                                                    </button>
                                                )
                                            }
                                            {
                                                step === 2 && (
                                                    <button className="submit w-full rounded-xl" disabled={!otp4} onClick={checkOtp}>
                                                        {steps[step - 1]?.buttonText}
                                                    </button>
                                                )
                                            }
                                        </div>

                                        {
                                            step === 2 && (
                                                <div className="flex flex-col gap-2 items-center justify-center text-center text-sm font-mediums text-gray-500">
                                                    {
                                                        resendButton ? (
                                                            <div className="flex gap-2">
                                                                <p>کد برای شما ارسال نشد؟</p>
                                                                <p className="flex flex-row items-center text-primary font-semibold cursor-pointer" onClick={() => getOtp({ resend: true })}>ارسال دوباره</p>
                                                            </div>
                                                        ) : (
                                                            <div className="flex gap-2">
                                                                <p>ارسال مجدد کد تا: </p>
                                                                <p className="flex flex-row items-center text-primary font-semibold cursor-pointer">{timeLeft / 1000} ثانیه دیگر</p>
                                                            </div>
                                                        )
                                                    }
                                                    <p className="font-semibold cursor-pointer" onClick={() => setStep(1)}>برای تغییر شماره همراه کلیک کنید</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}