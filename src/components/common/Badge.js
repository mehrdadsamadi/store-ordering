export default function Badge({children, className = ''}) {
    return (
        <span className={`text-sm me-2 py-1 px-2 rounded-lg bg-primary text-white ${className}`}>{children}</span>
    )
}