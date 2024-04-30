import connectMongo from "@/helpers/connectMongo";
import Category from "@/models/category.model";

export async function GET() {
    await connectMongo()

    try {
        return Response.json(
            await Category.find()
        )
    } catch (error) {
        console.log(error);
    }
}

export async function POST(req) {
    await connectMongo()

    const body = await req.json()

    if(body.parent === "") delete body.parent

    try {
        await Category.create(body)
        
        return Response.json("دسته بندی با موفقیت ایجاد شد")
    } catch (error) {
        console.log(error);
    }
}