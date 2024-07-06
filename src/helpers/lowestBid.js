import cron from 'node-cron';
import connectMongo from './connectMongo';
import Order from '@/models/order.model';
import { ORDER_STATUSES } from './orderStatuses';
import { sendSms } from './sendSms';
import User from '@/models/user.model';

async function findLowestBid() {
    await connectMongo();
    const now = new Date();
    const orders = await Order.find({ endBiddingAt: { $lte: now }, status: ORDER_STATUSES.PROCESSING.name }).populate("shippingInfo"); //رمان مناقصه تمام شده و وضعیت آن ها در حال پردازش است
    
    for (let order of orders) {
        if(order?.shippingInfo) {
            const driver = await User.findById(order.shippingInfo.driver) 
            console.log(driver);
            const sendedData = {
                "op": "pattern",
                "user": "FREE09371567428",
                "pass": "Faraz@0880337834",
                "fromNum": "+985000125475",
                "toNum": driver.phone,
                "patternCode": "t8vlrfkiqvxvumv",
                "inputData": [
                    { "orderId": order._id },
                    { "shippingCost": order.shippingInfo.shippingCost },
                ]
            }
    
            await sendSms(sendedData)
            await Order.findByIdAndUpdate(order._id, {status : ORDER_STATUSES.CONFIRMATION.name})
        } else {
            await Order.findByIdAndUpdate(order._id, {endBiddingAt: new Date(order.endBiddingAt.getTime() + 30 * 60 * 1000)})
        }
    } 
}

cron.schedule('*/5 * * * *', findLowestBid); // اجرا هر 5 دقیقه یک بار
