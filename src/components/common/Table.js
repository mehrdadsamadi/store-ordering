import Image from "next/image";
import EyeIcon from "../icons/EyeIcon";
import EditIcon from "../icons/EditIcon";
import Badge from "./Badge";

export default function Table({ data, headers }) {
    console.log(data);
    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-separate border-spacing-y-1">
            <thead className="text-xs text-gray-400 uppercase bg-primary">
                <tr>
                    <th scope="col" className="p-4">
                        <div className="flex items-center">
                            <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 bg-gray-100 border-primary rounded focus:ring-primary ring-offset-primary focus:ring-offset-primary focus:ring-2" />
                            <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                        </div>
                    </th>
                    {
                        headers?.length > 0 && headers.map((header, index) => (
                            <th key={index} scope="col" className="px-6 py-3">{header}</th>
                        ))
                    }
                    <th scope="col" className="px-6 py-3"></th>
                </tr>
            </thead>
            <tbody>
                {
                    data?.length > 0 && data.map(item => (
                        <tr key={item._id} className="border-b bg-primary/90 border-primary/90 hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 bg-gray-100 border-primary rounded focus:ring-primary ring-offset-primary focus:ring-offset-primary focus:ring-2" />
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            {
                                (item?.avatar || item?.first_name || item?.last_name || item?.phone) && (
                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {
                                            item?.avatar && (
                                                <Image width={50} height={50} className="w-10 h-10 rounded-full" src={item.avatar || '/placeholders/user-placeholder.jpg'} alt="Jese image" />
                                            )
                                        }
                                        <div className="ps-3">
                                            {
                                                item?.first_name && item?.last_name && (
                                                    <div className="text-base font-semibold">{item.first_name + " " + item.last_name}</div>
                                                )
                                            }
                                            {
                                                item?.phone && (
                                                    <div className="font-normal text-gray-500">{item.phone}</div>
                                                )
                                            }
                                        </div>
                                    </th>
                                )
                            }
                            {
                                item?.role && (
                                    <td className="px-6 py-4">{item.role}</td>
                                )
                            }
                            {
                                item?.category && (
                                    <td className="px-6 py-4">{item.category.name}</td>
                                )
                            }
                            {
                                item?.brand && (
                                    <td className="px-6 py-4">{item.brand.name}</td>
                                )
                            }
                            {
                                item?.specifications && (
                                    <td className="px-6 py-4">
                                        {
                                            item.specifications.map(spec => (
                                                <Badge key={spec._id} className="mx-1">{spec.specTitle}</Badge>
                                            ))
                                        }
                                    </td>
                                )
                            }
                            {/* <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                                </div>
                            </td> */}
                            <td className="px-6 py-4">
                                <div className="flex gap-2">
                                    <div className="cursor-pointer hover:text-white">
                                        <EyeIcon />
                                    </div>
                                    <div className="cursor-pointer hover:text-white">
                                        <EditIcon />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}