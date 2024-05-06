import connectMongo from "@/helpers/connectMongo";
import Category from "@/models/category.model";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectMongo()

        return NextResponse.json(await Category.find())
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

export async function POST(req) {
    try {
        await connectMongo()
    
        const body = await req.json()
        
        if(body.parent === "") delete body.parent

        await Category.create(body)
        
        return NextResponse.json({message: "دسته بندی با موفقیت ایجاد شد"})
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}