import Sidebar from "@/components/client/user/sidebar"
import { useGetServerSession } from "@/hooks/useGetServerSession"
import { redirect } from "next/navigation"

export default function UserLayout({ children }) {
    const { user } = useGetServerSession()
    if (!user) {
        return redirect("/")
    }

    return (
        <section className="p-4 flex gap-4 h-screen">
            <Sidebar />
            <div className="p-4 rounded-2xl w-full border overflow-hidden">
                {children}
            </div>
        </section>
    )
}