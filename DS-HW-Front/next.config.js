/** @type {import('next').NextConfig} */
const path = require('path')

const isDevelopment = process.env.NODE_ENV !== 'production';
const serverIP = 'localhost';

const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'scss')],
    },
    env: {
        development: isDevelopment ? `http://${serverIP}:8010` : 'http://localhost:8010',
        ACCESS_TOKEN: "accessToken",
    },
    images: {
        domains: [serverIP, "localhost"],
    }
}

module.exports = nextConfig
