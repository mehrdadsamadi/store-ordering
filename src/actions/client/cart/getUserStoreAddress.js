"use server"
import Store from "@/models/store.model";

export const getUserStoreAddress = async (user) => {
    const {phone} = user

    try {
        const storeDoc = await Store.findOne({phone})
        console.log(storeDoc);
        return JSON.parse(JSON.stringify(storeDoc))
    } catch (error) {
        console.log(error);
        return JSON.parse(JSON.stringify(error.message))
    }
}