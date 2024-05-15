"use client"
import Link from "next/link";
import BrandIcon from "../icons/BrandIcon";
import HomeIcon from "../icons/HomeIcon";
import TagIcon from "../icons/TagIcon";
import { usePathname } from "next/navigation";
import { getClientSession } from "@/helpers/sessions";
import { useEffect, useState } from "react";
import EditableImage from "../common/EditableImage";
import toast from "react-hot-toast";
import UsersIcon from "../icons/usersIcon";

export default function Sidebar() {

    const path = usePathname()

    const [user, setUser] = useState()
    const [avatar, setAvatar] = useState("/placeholders/user-placeholder.jpg")

    useEffect(() => {
        getClientSession()
        .then(res => res.json())
        .then(data => {setUser(data); setAvatar(data.avatar)})
    }, [])

    useEffect(() => {
        if(avatar !== "/placeholders/user-placeholder.jpg" && avatar !== user?.avatar) {
            updateAvatar()
        }
    }, [avatar])
    
    const updateAvatar = async () => {
        const updateAvatarPromise = new Promise(async (resolve, reject) => {

            const res = await fetch("/api/users", {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ avatar, phone: user.phone }),
            })

            const body = await res.json()
            res.ok ? resolve(body) : reject(body)
        })

        await toast.promise(
            updateAvatarPromise,
            {
                loading: 'در حال ثبت اطلاعات',
                success: ({ message }) => message,
                error: ({ error }) => error,
            }
        )
    }

    return (
        <aside className="sidebar h-full w-72">
            <div className="h-full bg-primary text-white rounded-2xl py-8 px-4 flex flex-col gap-3 overflow-y-auto">
                <div className="flex flex-col items-center border-b pb-4">
                    <div className="w-[150px] h-[150px] mb-4">
                        <EditableImage link={avatar} setLink={setAvatar} folder="users" hiddenUploadText />
                    </div>
                    {/* <div className="mx-auto rounded-2xl border p-2 mb-4">
                        <Image className="rounded-xl" src={user?.avatar || "/placeholders/user-placeholder.jpg"} alt="user avatar" width={100} height={100} />
                    </div> */}
                    {
                        user && (
                            <h2 className="text-white">{user?.first_name + " " + user?.last_name}</h2>
                        )
                    }
                </div>
                <Link href={"/admin"} className={`${path === '/admin' && 'active'} w-full grid grid-cols-3 cursor-pointer p-2 hover:bg-gray-50 hover:text-gray-800 rounded-lg`}>
                    <HomeIcon />
                    <h3 className="col-span-2">خانه</h3>
                </Link>
                <Link href={"/admin/categories"} className={`${path.includes('categories') && 'active'} w-full grid grid-cols-3 cursor-pointer p-2 hover:bg-gray-50 hover:text-gray-800 rounded-lg`}>
                    <TagIcon />
                    <h3 className="col-span-2">دسته بندی ها</h3>
                </Link>
                <Link href={"/admin/brands"} className={`${path.includes('brands') && 'active'} w-full grid grid-cols-3 cursor-pointer p-2 hover:bg-gray-50 hover:text-gray-800 rounded-lg`}>
                    <BrandIcon />
                    <h3 className="col-span-2">برند ها</h3>
                </Link>
                <Link href={"/admin/users"} className={`${path.includes('users') && 'active'} w-full grid grid-cols-3 cursor-pointer p-2 hover:bg-gray-50 hover:text-gray-800 rounded-lg`}>
                    <UsersIcon />
                    <h3 className="col-span-2">کاربر ها</h3>
                </Link>
            </div>
        </aside>
    )
}