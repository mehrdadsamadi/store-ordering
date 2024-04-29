import connectMongo from "@/helpers/connectMongo";
import User from "@/models/user.model";

export async function GET() {
    await connectMongo()

    await User.create({first_name: "مهرداد", last_name: "صمدی مقدم", phone: "09371567428", role: "ADMIN"})

    return Response.json("حساب کاربری با موفقیت ایجاد شد")
}