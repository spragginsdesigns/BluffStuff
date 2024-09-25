/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["utfs.io"]
	},
	env: {
		POSTGRES_URL: process.env.POSTGRES_URL
	}
};

export default nextConfig;
