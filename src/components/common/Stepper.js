import CheckIcon from "../icons/CheckIcon";

export default function Stepper({steps, activeStep = 1}) {
    return (
        <ul className="relative flex flex-row gap-x-2">
            {
                steps?.length > 0 && steps.map( item => (
                    <li key={item.step} className="flex items-center gap-x-2 shrink basis-0 flex-1 group">
                        <div className="flex flex-col items-start">
                            <div className="min-w-7 min-h-7 inline-flex justify-center items-center align-middle">
                                <span className={`size-10 flex justify-center items-center flex-shrink-0 bg-gray-100 text-primary font-medium ${(item.step === activeStep || item.step < activeStep ) && 'bg-primary text-white'} rounded-full`}>
                                    {
                                        item.step < activeStep ? (<CheckIcon />) : (item.step)
                                    }
                                </span>
                                <span className="ms-2 block font-medium text-gray-800">
                                    {item.title}
                                </span>
                            </div>

                            <p className="text-sm text-gray-500 dark:text-neutral-500">
                                {item.description}
                            </p>
                        </div>
                        <div className={`w-full h-[2px] flex-1 bg-gray-200 group-last:hidden ${item.step < activeStep && 'bg-primary'}`}></div>
                    </li>

                ))
            }
        </ul>
    )
}