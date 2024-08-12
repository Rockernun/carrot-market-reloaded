/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        //  해당 도메인을 가진 이미지를 image component로 최적화
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
