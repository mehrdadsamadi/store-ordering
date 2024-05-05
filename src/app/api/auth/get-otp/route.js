import connectMongo from "@/helpers/connectMongo";
import { getRandomFourDigit } from "@/helpers/getRandomFourDigit"
import User from "@/models/user.model"
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongo()

        const { phone, resend } = await req.json()
        if (resend) {
            await User.deleteOne({ phone })
        }

        const code = getRandomFourDigit()

        const sendedData = {
            "op": "pattern",
            "user": "FREE09371567428",
            "pass": "Faraz@0880337834",
            "fromNum": "+985000125475",
            "toNum": phone,
            "patternCode": "8ggrskeuyy2lkx4",
            "inputData": [
                { "verification-code": code }
            ]
        }

        const saveUserResult = saveUser(phone, code)
        if (!saveUserResult) {
            return NextResponse.json({ error: "ورود شما ناموفق بود ، بار دیگر تلاش کنید" }, { status: 401 })
        }

        await sendSms(sendedData)

        return NextResponse.json({ message: "کد تایید با موفقیت برای شما ارسال شد" })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

async function sendSms(data) {
    await fetch("http://ippanel.com/api/select", {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
}

async function saveUser(phone, code) {
    let otp = {
        code,
        expiresIn: (new Date().getTime() + 120000) // 2m
    }

    const existUserResult = await checkExistUser(phone)

    if (existUserResult) {
        return (await updateUserOtp(phone, otp))
    }
    return !!(await User.create({ phone, otp, role: "USER" }))
}

async function checkExistUser(phone) {
    const user = await User.findOne({ phone })
    return !!user
}

async function updateUserOtp(phone, otp) {
    const result = await User.updateOne({ phone }, { $set: { otp } })
    return !!result.modifiedCount
}