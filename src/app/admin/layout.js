import Sidebar from "@/components/admin/sidebar";
import { useGetServerSession } from "@/hooks/useGetServerSession";
import { redirect } from "next/navigation";
import { motion } from "framer-motion"

export default function AdminLayout({ children }) {
    const { user } = useGetServerSession()
    if (user.role !== "ADMIN") {
        return redirect("/")
    }

    return (
        <section className="p-4 flex gap-4 h-screen">
            <Sidebar />
            <div className="p-4 bg-gray-200 rounded-2xl w-full overflow-y-auto overflow-x-hidden">
                {children}
            </div>
        </section>
    )
}