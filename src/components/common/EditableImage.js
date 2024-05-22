"use client"

import Image from "next/image"
import toast from "react-hot-toast"
import UploadIcon from "../icons/UploadIcon"

export default function EditableImage({ link, setLink, folder = 'avatars', hiddenUploadText = false, rounded = false }) {
    const handleFileUpload = async (e) => {
        const files = e.target.files
        if (files.length > 0) {

            const data = new FormData()
            data.append("file", files[0])

            const fileUploadPromise = new Promise(async (resolve, reject) => {
                const res = await fetch(`/api/upload?folder=${folder}`, {
                    method: "POST",
                    body: data
                })

                res.ok ? resolve(res) : reject()
            })

            toast.promise(
                fileUploadPromise,
                {
                    loading: 'در حال آپلود ...',
                    success: 'با موفقیت آپلود شد.',
                    error: 'مشکلی به وجود آمده، بار دیگر امتحان کنید.',
                }
            )
                .then(res => res.json())
                .then(linkPath => {
                    setLink(linkPath)
                })

        }
    }

    return (
        <div className={`relative border w-full h-full rounded-md ${rounded && '!rounded-full'} overflow-hidden`}>
            {
                link && (
                    <Image src={link} alt="avatar" className="rounded-md w-full h-full mx-auto mb-1 " quality={100} width={120} height={120} />
                )
            }
            <label className="absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center cursor-pointer">
                <input type="file" className="hidden" onChange={handleFileUpload} />
                <div className={`border border-gray-300 bg-gray-50/30 cursor-pointer px-4 py-2 text-center text-gray-900 rounded-lg flex flex-col items-center justify-center ${hiddenUploadText && 'hidden'}`}>
                    <UploadIcon />
                    <p className="mt-2 font-semibold">آپلود تصویر</p>
                </div>
            </label>
        </div>
    )
}