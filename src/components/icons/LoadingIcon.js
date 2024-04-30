export default function LoadingIcon({ className = "" }) {
    return (
        <div className={`lds-ellipsis ${className}`}><div></div><div></div><div></div><div></div></div>
    )
}