import Table from "@/components/common/Table";

export default function page() {
    return (
        <section className="gap-4 flex flex-col h-full">
            <div className="w-full p-4 rounded-lg bg-white flex justify-between">
                <button className="submit">ایجاد کاربر</button>

                <div className="flex items-center gap-2">
                    <input type="text" className="!mb-0" placeholder="جستجو کاربر" />
                    <button>جستجو</button>
                </div>
            </div>
            <div className="w-full p-4 rounded-lg bg-white h-full relative">
                <Table />
            </div>
        </section>
    )
}