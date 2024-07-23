import path from 'path';
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['puppeteer-core', '@sparticuz/chromium'],
    outputFileTracingRoot: path.join(process.cwd(), 'tmp/'),
  },
};

export default nextConfig;
