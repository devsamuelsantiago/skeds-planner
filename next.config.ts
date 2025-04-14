import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 trailingSlash: true,

//  redirects: async () => [
//    {
//      source: '/:path*',
//      destination: '/',
//      permanent: false,
//    },
//  ]
};

export default nextConfig;