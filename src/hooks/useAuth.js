import { useEffect, useState } from "react";

export const useAuth = () => {
    const [user, setUser] = useState({})
    
    useEffect(() => {
        if(window.localStorage) {
            setUser(localStorage.getItem("user"))
        }
    }, [])

    return {user}
}