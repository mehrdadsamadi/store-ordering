import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Dialog({ showDialog, setShowDialog, title, requireFields, children, onSubmit, onClose }) {

    const [disable, setDisable] = useState(true)

    const isDisableButton = () => {
        setDisable(!requireFields.every(field => field?.length > 0))
    }

    useEffect(() => {
        if(requireFields?.length) {
            isDisableButton()
        }
    }, [requireFields])

    return (
        showDialog && (
            <div onClick={() => setShowDialog(false)} className="fixed inset-0 bg-black/30 flex items-center justify-center">
                <motion.div
                    className="bg-white p-2 rounded-lg max-w-md"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ ease: "linear", duration: 0.2 }}
                >
                    <div className="overflow-y-auto p-2" style={{ maxHeight: 'calc(100vh - 100px)' }}>
                        <h3 className="text-center mb-4 font-semibold border-b pb-2">{title}</h3>

                        {children}

                        <div className="sticky bottom-0 flex items-center justify-between">
                            <button type="button" disabled={requireFields && disable} onClick={onSubmit} className="submit">{title}</button>
                            <button type="button" onClick={onClose}>انصراف</button>
                        </div>
                    </div>
                </motion.div>
            </div>
        )
    )
}