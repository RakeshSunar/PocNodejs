
import { cookies } from 'next/headers';

export const getSession = async ()=>{
    // await new Promise((resolve)=> setTimeout(resolve,1000))
    // let token;
    // // console.log(window,"window")
    // if (typeof window !== 'undefined') {
    //   token = localStorage.getItem('token', data.accessToken);
    //   // localStorage.setItem('user', JSON.stringify(data.user));
    // }
    // console.log("token from get token",token)
    // return token;

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        console.log("first token",token)
        return token || null;
    } catch (error) {
        console.error("Error getting server session:", error);
        return null;
    }
}