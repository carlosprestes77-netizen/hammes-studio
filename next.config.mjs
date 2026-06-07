/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/hammes-studio',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/hammes-studio',
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
