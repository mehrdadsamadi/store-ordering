"use client"

import Tooltip from "@/components/common/Tooltip";
import HomeIcon from "@/components/icons/HomeIcon";
import ShoppingBagIcon from "@/components/icons/ShoppingBagIcon";
import ShoppingCartIcon from "@/components/icons/ShoppingCartIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {

    const path = usePathname()

    return (
        <aside className="user-sidebar h-full flex items-center">
            <div className="bg-primary text-white rounded-full flex flex-col items-center p-2 gap-3 overflow-y-auto">

                <Tooltip text="خانه">
                    <Link href={"/user/driver"} className={`${path === '/user/driver' && 'active'} flex items-center justify-center rounded-full size-16 border-none text-white hover:bg-gray-50/20`}>
                        <HomeIcon className="size-7" />
                    </Link>
                </Tooltip>

                {/* <Tooltip text="سبد خرید">
                    <Link href={"/user/storeOwner/cart"} className={`${path.includes('cart') && 'active'} flex items-center justify-center rounded-full size-16 border-none text-white hover:bg-gray-50/20`}>
                        <ShoppingCartIcon className="size-7" />
                    </Link>
                </Tooltip>

                <Tooltip text="سفارش ها">
                    <Link href={"/user/storeOwner/orders"} className={`${path.includes('orders') && 'active'} flex items-center justify-center rounded-full size-16 border-none text-white hover:bg-gray-50/20`}>
                        <ShoppingBagIcon className="size-7" />
                    </Link>
                </Tooltip> */}
            </div>
        </aside>
    )
}