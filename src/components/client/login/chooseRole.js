"user client"

import { motion } from "framer-motion"
import ShopStoreIcon from "@/components/icons/ShopStoreIcon";
import TruckIcon from "@/components/icons/TruckIcon";
import { ROLES } from "@/helpers/roles";
import { useEffect, useState } from "react";
import EditableImage from "@/components/common/EditableImage";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import StoreInfo from "./StoreInfo";

export default function ChooseRole({ setLoading, phone }) {

    const { push } = useRouter()

    const [role, setRole] = useState('')
    const [step, setStep] = useState(1)

    const [userImage, setUserImage] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    useEffect(() => {
        if (role !== '') {
            setStep(2)
        }
    }, [role])

    const submitUserBaseInfo = async (e) => {
        e.preventDefault();

        setLoading(true)

        const userBaseInfoPromise = new Promise(async (resolve, reject) => {

            const res = await fetch("/api/users", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ first_name: firstName, last_name: lastName, avatar: userImage, role, phone }),
            })

            const body = await res.json()
            res.ok ? resolve(body) : reject(body)
        })

        await toast.promise(
            userBaseInfoPromise,
            {
                loading: 'در حال ثبت اطلاعات',
                success: ({ message }) => message,
                error: ({ error }) => error,
            }
        )
            .then(() => {
                if(role === ROLES.DRIVER) {
                    return push("/")
                } else {
                    setStep(3)
                }
            })
            .finally(() => setLoading(false))
    }

    return (
        <motion.div
            dir="rtl"
            className="w-full"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ease: "linear", duration: 0.5 }}
            key={step}
        >
            {
                step === 1 && (
                    <div className="grid grid-cols-2 gap-2 w-full">
                        <div onClick={() => setRole(ROLES.STORE_OWNER)} className="rounded-xl p-4 border cursor-pointer hover:font-semibold flex items-center gap-2 justify-center">
                            <ShopStoreIcon />
                            <p>فروشگاه دار</p>
                        </div>
                        <div onClick={() => setRole(ROLES.DRIVER)} className="rounded-xl p-4 border cursor-pointer hover:font-semibold flex items-center gap-2 justify-center">
                            <TruckIcon />
                            <p>راننده</p>
                        </div>
                    </div>
                )
            }
            {
                step === 2 && (
                    <form className="flex flex-col gap-4" onSubmit={submitUserBaseInfo}>
                        <div className="w-[150px] h-[150px] mx-auto text-nowrap">
                            <label htmlFor="">تصویر خود را بارگذاری کنید</label>
                            <EditableImage link={userImage} setLink={setUserImage} folder="users" />
                        </div>
                        
                        <div>
                            <label htmlFor="">نام</label>
                            <div className="h-11">
                                <input type="text" placeholder="نام" value={firstName} onChange={e => setFirstName(e.target.value)} />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="">نام خانوادگی</label>
                            <div className="h-11">
                                <input type="text" placeholder="نام خانوادگی" value={lastName} onChange={e => setLastName(e.target.value)} />
                            </div>
                        </div>

                        <div className="w-full mt-2">
                            <button type="submit" disabled={!userImage || !firstName || !lastName} className="submit w-full rounded-xl">ثبت و ادامه</button>
                        </div>
                    </form>
                )
            }
            {
                step === 3 && (
                    <StoreInfo setLoading={setLoading}/>
                )
            }
        </motion.div>
    )
}