/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "uploadthing.com",
      "utfs.io",
      "subdomain",
      "files.stripe.com",
      "glora-bucket.s3.eu-north-1.amazonaws.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "subdomain",
      },
      {
        protocol: "https",
        hostname: "files.stripe.com",
      },
      {
        protocol: "https",
        hostname: "glora-bucket.s3.eu-north-1.amazonaws.com",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
