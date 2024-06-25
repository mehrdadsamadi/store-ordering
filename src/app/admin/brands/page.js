"use client"
import { motion } from "framer-motion"
import Dialog from "@/components/common/Dialog"
import EditableImage from "@/components/common/EditableImage"
import Loading from "@/components/common/Loading"
import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import toast from "react-hot-toast"
import TrashIcon from "@/components/icons/TrashIcon"
import ConfirmBtn from "@/components/common/ConfirmBtn"
import Alert from "@/components/common/Alert"
import * as Yup from "yup"
import { useValidateFormSchema } from "@/hooks/useValidateFormSchema"
import InputErrorMessage from "@/components/common/InputErrorMessage"
import { debounce } from "@/helpers/debounce"

const validationSchema = Yup.object().shape({
    name: Yup.string().required('نام برند را وارد کنید'),
});

export default function Brands() {

    const { validate, errors } = useValidateFormSchema()

    const [showDialog, setShowDialog] = useState(false)
    const [loading, setLoading] = useState(true)
    const [brands, setBrands] = useState([])
    const [searchedBrands, setSearchedBrands] = useState([])
    const [brandImage, setBrandImage] = useState('')
    const [brandName, setBrandName] = useState('')
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchBrands()
    }, [])

    const fetchBrands = () => {
        setLoading(true)

        fetch("/api/admin/brands")
            .then(res => res.json())
            .then(data => {
                setBrands(data)
                setSearchedBrands(data)
            })
            .finally(() => setLoading(false))
    }

    const handleShowDialog = () => {
        if (!showDialog) {
            setShowDialog(true)
        }
    }

    const handleCloseDialog = () => {
        setBrandImage('')
        setBrandName('')
        setShowDialog(false)
    }

    const handleSearch = (searchValue) => {
        if (searchValue === '') {
            setBrands(searchedBrands)
        } else {
            setBrands(searchedBrands.filter(sb => sb.name.includes(searchValue)))
        }
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        debouncedSearch(e.target.value); // مقدار searchValue به تابع debounced ارسال می‌شود
    };

    const debouncedSearch = useCallback(
        debounce((value) => handleSearch(value), 500),
        [searchedBrands]
    );

    const handleRemoveBrand = async (brandId) => {
        const removeBrandPromise = new Promise(async (resolve, reject) => {
            const res = await fetch("/api/admin/brands", {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: brandId }),
            })

            fetchBrands()

            const body = await res.json()
            res.ok ? resolve(body) : reject(body)
        })

        await toast.promise(
            removeBrandPromise,
            {
                loading: 'در حال حذف برند ...',
                success: ({ message }) => message,
                error: ({ error }) => error,
            }
        )
    }

    const handleCreateBrand = async () => {
        const data = { name: brandName, image: brandImage }

        validate(validationSchema, data)

        const createBrandPromise = new Promise(async (resolve, reject) => {

            const res = await fetch("/api/admin/brands", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            if (Object.keys(errors).length) {
                handleCloseDialog()
                fetchBrands()
            }

            const body = await res.json()
            res.ok ? resolve(body) : reject(body)
        })

        await toast.promise(
            createBrandPromise,
            {
                loading: 'در حال ایجاد برند ...',
                success: ({ message }) => message,
                error: ({ error }) => error,
            }
        )
    }
    return (
        <section className="gap-4 flex flex-col h-full">
            <div className="w-full p-4 rounded-lg bg-white flex justify-between">
                <button className="submit" onClick={handleShowDialog}>ایجاد برند</button>

                <div className="flex items-center gap-2">
                    <input type="text" value={search} onChange={handleSearchChange} className="!mb-0" placeholder="جستجو برند" />
                    {/* <button onClick={handleSearch}>جستجو</button> */}
                </div>
            </div>
            <div className="w-full p-4 rounded-lg bg-white h-full relative">
                {
                    brands?.length > 0 ? (
                        <motion.div
                            className="grid grid-cols-6 gap-2 brands-container"
                            initial={{ x: -200, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ ease: "linear", duration: 0.5 }}
                        >
                            {
                                brands.map(brand => (
                                    <div key={brand._id} className="grid grid-cols-3 items-center px-4 py-2 bg-gray-200 rounded-md">
                                        <Image src={brand?.image || "/placeholders/img-placeholder.webp"} alt="brand image" className="rounded-full w-[60px] h-[60px]" width={60} height={60} />
                                        <div className="col-span-2 flex justify-between items-center">
                                            <h3 className="col-span-2">{brand.name}</h3>
                                            <ConfirmBtn onConfirm={() => handleRemoveBrand(brand._id)} className="!p-2 rounded-full text-center hover:bg-gray-300 cursor-pointer border-none">
                                                <TrashIcon />
                                            </ConfirmBtn>
                                        </div>
                                    </div>
                                ))
                            }
                        </motion.div>
                    ) : (
                        <Alert text="تا کنون برندی اضافه نشده است" />
                    )
                }
                <Loading loading={loading} />
                <Dialog showDialog={showDialog} requireFields={[brandName]} title="ایجاد برند" onSubmit={handleCreateBrand} onClose={handleCloseDialog}>
                    <div className="w-[300px] h-[200px]">
                        <EditableImage link={brandImage} setLink={setBrandImage} folder="brands" />
                    </div>

                    <div className="my-4 flex flex-col gap-2">
                        <div>
                            <div className="h-11">
                                <input type="text" value={brandName} onChange={e => setBrandName(e.target.value)} placeholder="نام برند" />
                            </div>
                            <InputErrorMessage message={errors?.name} />
                        </div>
                    </div>
                </Dialog>
            </div>
        </section>
    )
}