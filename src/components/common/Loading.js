import LoadingIcon from "../icons/LoadingIcon";

export default function Loading({loading}) {
    return (
        loading && (
            <div className="inset-0 bg-black/20 flex items-center justify-center absolute rounded-md">
                <div className="border border-gray-300 bg-gray-50/30 px-4 py-2 text-center text-gray-900 rounded-lg flex flex-col items-center justify-center">
                    <LoadingIcon />
                    <p className="mt-2 font-semibold cursor-default">منتظر بمانید</p>
                </div>
            </div>
        )
    )
}