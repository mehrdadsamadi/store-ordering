import toast from "react-hot-toast"

export async function logout() {
    const logoutPromise = new Promise(async (resolve, reject) => {
        const res = await fetch("/api/auth/session", {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' }
        })

        const body = await res.json()
        res.ok ? resolve(body) : reject(body)
    })

    await toast.promise(
        logoutPromise,
        {
            loading: 'در حال خروج از حساب کاربری',
            success: ({ message }) => message,
            error: ({ error }) => error,
        }
    )
    .then(() => window.location.href = "/login")
}