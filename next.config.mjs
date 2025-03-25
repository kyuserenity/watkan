/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "ibtrthszkxtalbtqkrnv.supabase.co",
      },
    ],
  },
};

export default nextConfig;
