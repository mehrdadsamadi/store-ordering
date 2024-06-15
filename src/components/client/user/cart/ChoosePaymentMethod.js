import { PAYMENT_METHODS } from "@/helpers/paymentMethods"

export default function ChoosePaymentMethod({method, setMethod}) {

    // const [method, setMethod] = useState(PAYMENT_METHODS.INTERNET)

    return (
        <section>
            <div className="flex flex-col gap-4">
                <div>
                    <p className="font-semibold">انتخاب روش پرداخت</p>
                </div>
                <div className="grid grid-cols-2 gap-2 w-full">
                    {
                        Object.keys(PAYMENT_METHODS).map((pm, index) => (
                            <div key={index} onClick={() => setMethod(PAYMENT_METHODS[pm].name)} className={`rounded-xl p-4 border cursor-pointer hover:font-semibold flex items-center gap-2 justify-center ${method === PAYMENT_METHODS[pm].name && " bg-gray-100"}`}>
                                {PAYMENT_METHODS[pm].icon}
                                <p>{PAYMENT_METHODS[pm].text}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}