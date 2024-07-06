"use client"

import ConfirmBtn from "@/components/common/ConfirmBtn";
import Tooltip from "@/components/common/Tooltip";
import ArrowLeftStartOnRectangleIcon from "@/components/icons/ArrowLeftStartOnRectangleIcon";
import HomeIcon from "@/components/icons/HomeIcon";
import ShoppingBagIcon from "@/components/icons/ShoppingBagIcon";
import ShoppingCartIcon from "@/components/icons/ShoppingCartIcon";
import { logout } from "@/helpers/logout";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {

    const path = usePathname()

    return (
        <aside className="user-sidebar h-full flex items-center">
            <div className="bg-primary text-white rounded-full flex flex-col items-center p-2 gap-3 overflow-y-auto">

                <Tooltip text="خانه">
                    <Link href={"/user/storeOwner"} className={`${path === '/user/storeOwner' && 'active'} flex items-center justify-center rounded-full size-16 border-none text-white hover:bg-gray-50/20`}>
                        <HomeIcon className="size-7" />
                    </Link>
                </Tooltip>

                <Tooltip text="سبد خرید">
                    <Link href={"/user/storeOwner/cart"} className={`${path.includes('storeOwner/cart') && 'active'} flex items-center justify-center rounded-full size-16 border-none text-white hover:bg-gray-50/20`}>
                        <ShoppingCartIcon className="size-7" />
                    </Link>
                </Tooltip>

                <Tooltip text="سفارش ها">
                    <Link href={"/user/storeOwner/orders"} className={`${path.includes('storeOwner/orders') && 'active'} flex items-center justify-center rounded-full size-16 border-none text-white hover:bg-gray-50/20`}>
                        <ShoppingBagIcon className="size-7" />
                    </Link>
                </Tooltip>

                <Tooltip text="خروج">
                    <ConfirmBtn onConfirm={logout} confirmBtnText="خروج" title="برای خروج مطمعن هستید؟" className="flex items-center justify-center rounded-full size-16 border-none hover:bg-gray-50/20">
                        <ArrowLeftStartOnRectangleIcon className="size-7" />
                    </ConfirmBtn>
                </Tooltip>
            </div>
        </aside>
    )
}