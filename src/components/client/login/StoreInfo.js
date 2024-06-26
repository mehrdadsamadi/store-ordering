import Map from "@/components/common/Map";
import { getClientSession } from "@/helpers/sessions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function StoreInfo({ setLoading, editingAddress = false, storeInfo }) {

    const { push } = useRouter()

    const [storeLoc, setStoreLoc] = useState([35.715298, 51.404343])
    const [storeName, setStoreName] = useState('')
    const [province, setProvince] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')

    const [allProcvinces, setAllProcvinces] = useState([])
    const [provinceCities, setProvinceCities] = useState([])

    useEffect(() => {
        if (storeInfo) {
            setStoreName(storeInfo.name)
            setProvince(storeInfo.province)
            setCity(storeInfo.city)
            setAddress(storeInfo.address)
        }
        getAllProvinces()

    }, [])

    useEffect(() => {
        if (province) {
            getProvinceCities()
        }
    }, [province])

    const getAllProvinces = () => {
        setLoading(true)

        fetch("https://iran-locations-api.ir/api/v1/fa/states")
            .then(res => res.json())
            .then(data => { setAllProcvinces(data); !editingAddress && setProvince(data[0].name) })
            .finally(() => setLoading(false))
    }

    const getProvinceCities = () => {
        setLoading(true)

        fetch(`https://iran-locations-api.ir/api/v1/fa/cities?state=${province}`)
            .then(res => res.json())
            .then(data => { setProvinceCities(data[0].cities); !editingAddress && setCity(data[0].cities[0].name) })
            .finally(() => setLoading(false))
    }

    const submitStoreInfo = (e) => {
        e.preventDefault();

        setLoading(true)

        getClientSession()
            .then(res => res.json())
            .then(async user => {

                const storeInfoPromise = new Promise(async (resolve, reject) => {

                    const res = await fetch("/api/users/store-info", {
                        method: editingAddress ? "PUT" : "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name: storeName, province, city, address, location: storeLoc, phone: user.phone }),
                    })

                    const body = await res.json()
                    res.ok ? resolve(body) : reject(body)
                })

                await toast.promise(
                    storeInfoPromise,
                    {
                        loading: 'در حال ثبت اطلاعات',
                        success: ({ message }) => message,
                        error: ({ error }) => error,
                    }
                )
                    .then(() => {
                        if(!editingAddress) {
                            return push("/")
                        }
                    })
                    .finally(() => setLoading(false))
            })
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={submitStoreInfo}>
            
            <div>
                <label htmlFor="">موقعیت مکانی فروشگاه</label>
                <div className="w-[300px] h-[300px] overflow-hidden rounded-md mx-auto">
                    <Map setStoreLoc={setStoreLoc} center={editingAddress ? [storeInfo.location.lat, storeInfo.location.lng] : [35.715298, 51.404343]} />
                </div>
            </div>

            <div>
                <label htmlFor="">نام فروشگاه</label>
                <div className="h-11">
                    <input type="text" placeholder="نام فروشگاه" value={storeName} onChange={e => setStoreName(e.target.value)} />
                </div>
            </div>

            <div>
                <label htmlFor="">استان</label>
                <div className="h-11">
                    <select className="px-2 pt-2" value={province} onChange={e => setProvince(e.target.value)}>
                        {
                            allProcvinces?.length > 0 &&
                            allProcvinces.map(p => (
                                <option key={p.id} value={p.name}>{p.name}</option>
                            ))
                        }
                    </select>
                </div>
            </div>

            <div>
                <label htmlFor="">شهر</label>
                <div className="h-11">
                    <select disabled={!province} className="px-2 pt-2" value={city} onChange={e => setCity(e.target.value)}>
                        {
                            provinceCities?.length > 0 &&
                            provinceCities.map(c => (
                                <option key={c.id} value={c.name}>{c.name}</option>
                            ))
                        }
                    </select>
                </div>
            </div>

            <div>
                <label htmlFor="">آدرس</label>
                <div className="h-11">
                    <textarea type="text" placeholder="آدرس" value={address} onChange={e => setAddress(e.target.value)} />
                </div>
            </div>

            <div className="w-full mt-2">
                <button type="submit" disabled={!storeName || !province || !city || !address} className="submit w-full rounded-xl">ثبت و ادامه</button>
            </div>
        </form>
    )
}