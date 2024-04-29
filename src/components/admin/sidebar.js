"use client"
import Link from "next/link";
import BrandIcon from "../icons/BrandIcon";
import HomeIcon from "../icons/HomeIcon";
import TagIcon from "../icons/TagIcon";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Sidebar() {

    const path = usePathname()

    return (
        <aside className="sidebar h-full w-72">
            <div className="h-full bg-gray-950 text-white rounded-2xl py-8 px-4 flex flex-col gap-3 overflow-y-auto">
                <div className="flex flex-col items-center border-b pb-4">
                    <div className="mx-auto rounded-2xl border p-2 mb-4">
                        <Image className="rounded-xl" src={"/placeholders/user-placeholder.jpg"} alt="user avatar" width={100} height={100} />
                    </div>
                    <h2 className="text-white">مهرداد صمدی مقدم</h2>
                </div>
                <Link href={"/admin"} className={`${path === '/admin' && 'active'} w-full grid grid-cols-3 cursor-pointer p-2 hover:bg-gray-50 hover:text-gray-950 rounded-lg`}>
                    <HomeIcon />
                    <h3 className="col-span-2">خانه</h3>
                </Link>
                <Link href={"/admin/categories"} className={`${path.includes('categories') && 'active'} w-full grid grid-cols-3 cursor-pointer p-2 hover:bg-gray-50 hover:text-gray-950 rounded-lg`}>
                    <TagIcon />
                    <h3 className="col-span-2">دسته بندی ها</h3>
                </Link>
                <Link href={"/admin/brands"} className={`${path.includes('brands') && 'active'} w-full grid grid-cols-3 cursor-pointer p-2 hover:bg-gray-50 hover:text-gray-950 rounded-lg`}>
                    <BrandIcon />
                    <h3 className="col-span-2">برند ها</h3>
                </Link>
            </div>
        </aside>
    )
}