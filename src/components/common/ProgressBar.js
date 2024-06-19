export default function ProgressBar({ progress }) {
    
    return (
        <div className="w-full bg-gray-300 rounded-full h-2.5">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
    )
}