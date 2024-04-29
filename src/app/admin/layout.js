import Sidebar from "@/components/admin/sidebar";

export default function AdminLayout({children}) {
    return (
        <section className="p-4 flex gap-4 h-screen">
            <Sidebar />
            <div className="p-8 bg-gray-200 rounded-2xl w-full overflow-y-auto">
                {children}
            </div>
        </section>
    )
}