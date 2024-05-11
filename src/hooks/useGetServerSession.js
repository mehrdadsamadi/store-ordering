import { cookies } from "next/headers"

export const useGetServerSession = () => {
    return {user: JSON.parse(cookies().get("user")?.value || null)}
}