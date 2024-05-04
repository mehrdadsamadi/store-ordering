import connectMongo from "@/helpers/connectMongo";
import Category from "@/models/category.model";
import { NextResponse } from "next/server";

export async function GET(_, {params}) {
    await connectMongo()
    
    try {
        return Response.json(
            await Category.find({parent: params.parentId})
        )
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}