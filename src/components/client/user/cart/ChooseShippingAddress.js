import { getUserStoreAddress } from "@/actions/client/cart/getUserStoreAddress"
import Dialog from "@/components/common/Dialog"
import Map from "@/components/common/Map"
import EditIcon from "@/components/icons/EditIcon"
import ExclamationCircleIcon from "@/components/icons/ExclamationCircleIcon"
import { getClientSession } from "@/helpers/sessions"
import { useEffect, useLayoutEffect, useState } from "react"
import StoreInfo from "../../login/StoreInfo"
import Loading from "@/components/common/Loading"

export default function ChooseShippingAddress({ setAddress }) {

    const [user, setUser] = useState()
    const [storeInfo, setStoreInfo] = useState()
    const [showDialog, setShowDialog] = useState(false)
    const [loading, setLoading] = useState(false)

    useLayoutEffect(() => {
        setLoading(true)

        getClientSession()
            .then(res => res.json())
            .then(async user => {
                if (user) {
                    setUser(user)
                }
            })
    }, [])

    useEffect(() => {
        getStoreAddress()
            .then(address => {
                setStoreInfo(address)
                setAddress(address)
                setLoading(false)
            })
    }, [user])

    const getStoreAddress = async () => {
        return await getUserStoreAddress(user)
    }

    const handleCloseDialog = async () => {
        setLoading(true)
        
        getStoreAddress()
            .then(address => {
                setStoreInfo(address)
                setAddress(address)
                setLoading(false)
            })
        setShowDialog(false)
    }

    return (
        <section >
            <Loading loading={loading} />
            {
                storeInfo && (
                    <div className="flex gap-4">
                        {
                            storeInfo && (
                                <div className="w-[200px] h-[200px] overflow-hidden rounded-md">
                                    <Map center={[storeInfo.location.lat, storeInfo.location.lng]} canMove={false} />
                                </div>
                            )
                        }

                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold">{storeInfo.address}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-sm">نام محل:</p>
                                <p className="text-sm font-semibold">{storeInfo.name}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-sm">شماره تماس:</p>
                                <p className="text-sm font-semibold">{storeInfo.phone}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-sm">استان:</p>
                                <p className="text-sm font-semibold">{storeInfo.province}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-sm">شهر:</p>
                                <p className="text-sm font-semibold">{storeInfo.city}</p>
                            </div>
                            <div className="flex items-center gap-2 text-red-400">
                                <p className="text-sm">
                                    <ExclamationCircleIcon />
                                </p>
                                <p className="text-sm font-semibold">بعد از تکمیل سفارش ،در همین روز برای شما ارسال میشود</p>
                            </div>
                            <div className="flex items-center gap-2 text-blue-400 cursor-pointer" onClick={() => setShowDialog(true)}>
                                <p className="text-sm">
                                    <EditIcon />
                                </p>
                                <p className="text-sm font-semibold">ویرایش آدرس</p>
                            </div>
                        </div>
                        <Dialog showDialog={showDialog} setShowDialog={setShowDialog} title="ویرایش آدرس" showBtns={false} onClose={handleCloseDialog}>
                            <StoreInfo setLoading={setLoading} editingAddress storeInfo={storeInfo} />
                        </Dialog>
                    </div>
                )
            }
        </section>
    )
}