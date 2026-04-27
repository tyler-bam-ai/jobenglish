import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/jobenglish',
  transpilePackages: ['@jobenglish/shared'],
  turbopack: {
    root: '../../',
  },
};

export default nextConfig;
