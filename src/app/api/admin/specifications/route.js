import connectMongo from "@/helpers/connectMongo";
import Specification from "@/models/specification.model";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongo()

        const body = await req.json()

        await Specification.create(body)
        
        return NextResponse.json({message: "مشخصات با موفقیت ایجاد شد"})
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}