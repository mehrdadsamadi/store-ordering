import Map from "@/components/common/Map";
import { useState } from "react";

export default function StoreInfo() {

    const [storeLoc, setStoreLoc] = useState([35.715298, 51.404343])
    const [storeName, setStoreName] = useState('')
    const [procvince, setProcvince] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')


    return (
        <form className="flex flex-col gap-4">
            <div>
                <label htmlFor="">موقعیت مکانی فروشگاه</label>
                <div className="w-full h-[300px] overflow-hidden rounded-md">
                    <Map setStoreLoc={setStoreLoc} />
                </div>
            </div>

            <div>
                <label htmlFor="">استان</label>
                <div className="h-11">
                    <input type="text" placeholder="استان" value={procvince} onChange={e => setProcvince(e.target.value)} />
                </div>
            </div>

            <div>
                <label htmlFor="">شهر</label>
                <div className="h-11">
                    <input type="text" placeholder="شهر" value={city} onChange={e => setCity(e.target.value)} />
                </div>
            </div>

            <div>
                <label htmlFor="">آدرس</label>
                <div className="h-11">
                    <textarea type="text" placeholder="آدرس" value={address} onChange={e => setAddress(e.target.value)} />
                </div>
            </div>
        </form>
    )
}