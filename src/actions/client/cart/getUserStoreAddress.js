"use server"
import Store from "@/models/store.model";

export const getUserStoreAddress = async (user) => {
    if(user) {
        const {phone} = user
    
        try {
            const storeDoc = await Store.findOne({phone})
            return JSON.parse(JSON.stringify(storeDoc))
        } catch (error) {
            console.log(error);
            return JSON.parse(JSON.stringify(error.message))
        }
    }
}