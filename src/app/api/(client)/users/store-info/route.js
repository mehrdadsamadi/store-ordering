import connectMongo from "@/helpers/connectMongo";
import Store from "@/models/store.model";
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        await connectMongo()
        
        const body = await req.json()
        
        await Store.create(body)

        return NextResponse.json({ message: "اطلاعات شما با موفقیت ثبت شد" })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}