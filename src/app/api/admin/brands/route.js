import connectMongo from "@/helpers/connectMongo";
import Brand from "@/models/brand.model";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectMongo()

        return NextResponse.json(await Brand.find())
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

export async function POST(req) {
    try {
        await connectMongo()
    
        const body = await req.json()

        await Brand.create(body)
        
        return NextResponse.json({message: "برند با موفقیت ایجاد شد"})
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}