import withFlowbiteReact from "flowbite-react/plugin/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
   output: 'standalone',
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'resumebuilderbackend.hiringeye.ai',
        port: '',
        pathname: '/uploads/images/**',
      },
         {
        protocol: 'https',
        hostname: 'resumebuilderbackend.hiringeye.ai',
        port: '',
        pathname: '/uploads/images/**',
      },
    ],
  },
};

export default withFlowbiteReact(nextConfig);