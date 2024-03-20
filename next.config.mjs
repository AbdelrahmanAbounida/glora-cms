/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["uploadthing.com", "utfs.io", "subdomain", "files.stripe.com"],
  },
  reactStrictMode: false,
};

export default nextConfig;
