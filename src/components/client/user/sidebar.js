"use client"

import Tooltip from "@/components/common/Tooltip";
import HomeIcon from "@/components/icons/HomeIcon";
import ShoppingCartIcon from "@/components/icons/ShoppingCartIcon";
import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="user-sidebar h-full flex items-center">
            <div className="bg-primary text-white rounded-full flex flex-col items-center p-2 gap-3 overflow-y-auto">

                <Tooltip text="خانه">
                    <Link href={"/"} className="flex items-center justify-center rounded-full size-16 border-none text-white hover:bg-gray-50/20 active">
                        <HomeIcon className="size-7" />
                    </Link>
                </Tooltip>

                <Tooltip text="سبد خرید">
                    <Link href={"/"} className="flex items-center justify-center rounded-full size-16 border-none text-white hover:bg-gray-50/20">
                        <ShoppingCartIcon className="size-7" />
                    </Link>
                </Tooltip>
            </div>
        </aside>
    )
}