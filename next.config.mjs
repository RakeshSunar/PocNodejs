/** @type {import('next').NextConfig} */
const nextConfig = { 
    env:{
        NEXT_PUBLIC_API_URL:'http://localhost:4000',
        JWT_SECRET:"nodepoc"
        // NEXT_PROD_API_URL:'https://contact-management-system-whim.onrender.com'
    }};



export default nextConfig;
