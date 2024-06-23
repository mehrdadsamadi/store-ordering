import SOSidebar from "@/components/client/user/storeOwner/sidebar"
import DSidebar from "@/components/client/user/driver/sidebar"
import { ROLES } from "@/helpers/roles";
import { useGetServerSession } from "@/hooks/useGetServerSession"
import { redirect } from "next/navigation"

export default function UserLayout({ children }) {
    const { user } = useGetServerSession()
    if (!user) {
        return redirect("/login")
    }

    return (
        <section className="p-4 flex gap-4 h-screen">
            {
                user?.role === ROLES.STORE_OWNER.name && (
                    <SOSidebar />
                )
            }
            {
                user?.role === ROLES.DRIVER.name && (
                    <DSidebar />
                )
            }
            <div className="p-4 rounded-2xl w-full overflow-hidden relative">
                {children}
            </div>
        </section>
    )
}