export const getClientSession = async () => {
    return await fetch("/api/auth/session")
}