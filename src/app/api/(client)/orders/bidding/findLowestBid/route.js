import connectMongo from "@/helpers/connectMongo";
import { formatPriceNumber } from "@/helpers/formatPriceInput";
import { ORDER_STATUSES } from "@/helpers/orderStatuses";
import { sendSms } from "@/helpers/sendSms";
import Order from "@/models/order.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function PUT() {
    try {
        await connectMongo();

        const now = new Date();
        const orders = await Order.find({ endBiddingAt: { $lte: now }, status: ORDER_STATUSES.PROCESSING.name }).populate("shippingInfo"); //رمان مناقصه تمام شده و وضعیت آن ها در حال پردازش است

        orders.map(async order => {
            if (order?.shippingInfo) {
                const driver = await User.findById(order.shippingInfo.driver)

                await Order.findByIdAndUpdate(order._id, { status: ORDER_STATUSES.CONFIRMATION.name })

                const sendedData = {
                    "op": "pattern",
                    "user": "FREE09371567428",
                    "pass": "Faraz@0880337834",
                    "fromNum": "+985000125475",
                    "toNum": String(driver.phone),
                    "patternCode": "t8vlrfkiqvxvumv",
                    "inputData": [{
                        "order-id": String(order._id),
                        "shipping-cost": `${formatPriceNumber(String(order.shippingInfo.shippingCost))} تومان`
                    }]

                }
                
                await sendSms(sendedData)
            } else {
                await Order.findByIdAndUpdate(order._id, { endBiddingAt: new Date(order.endBiddingAt.getTime() + 30 * 60 * 1000) })
            }
        })
        return NextResponse.json({})
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}