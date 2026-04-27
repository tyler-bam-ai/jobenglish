import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@jobenglish/shared'],
  turbopack: {
    root: '../../',
  },
};

export default nextConfig;
