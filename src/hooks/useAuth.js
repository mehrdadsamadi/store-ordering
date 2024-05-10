import { useEffect, useState } from "react";

export const useAuth = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const userData = localStorage.getItem("user")
        setUser(JSON.parse(userData))
    }, [])

    return { user }
}