"user client"

import { motion } from "framer-motion"
import ShopStoreIcon from "@/components/icons/ShopStoreIcon";
import TruckIcon from "@/components/icons/TruckIcon";
import { ROLES } from "@/helpers/roles";
import { useEffect, useState } from "react";
import EditableImage from "@/components/common/EditableImage";

export default function ChooseRole() {

    const [role, setRole] = useState('')
    const [step, setStep] = useState(1)

    const [userImage, setUserImage] = useState('')

    useEffect(() => {
        if (role !== '') {
            setStep(2)
        }
    }, [role])

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
                step === 2 && role === ROLES.DRIVER && (
                    <form className="flex flex-col gap-4">
                        <div className="w-full h-[150px]">
                            <EditableImage link={userImage} setLink={setUserImage} folder="users" />
                        </div>
                        <div>
                            <label htmlFor="">نام</label>
                            <div className="h-11">
                                <input type="text" placeholder="نام" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="">نام خانوادگی</label>
                            <div className="h-11">
                                <input type="text" placeholder="نام خانوادگی" />
                            </div>
                        </div>
                    </form>
                )
                
            }
            {
                step === 2 && role === ROLES.STORE_OWNER && (
                    <>
                        hello
                    </>
                )
            }
        </motion.div>
    )
}