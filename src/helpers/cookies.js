"use server"
import { cookies } from "next/headers";

export const setCookie = (data) => {
    const oneWeek = 7 * 24 * 60 * 60 * 1000;

    const prevCookie = cookies().get("user") && JSON.parse(cookies().get("user").value);

    let cookieObject = {};

    ['phone', 'first_name', 'last_name', 'role', 'avatar', "_id"].map(item => {
        if(data[item]) {
            cookieObject[item] = data[item]
        } else if(prevCookie) {
            cookieObject[item] = prevCookie[item]
        }
    })
    cookies().set('user', JSON.stringify(cookieObject), { expires: Date.now() + oneWeek })
}
