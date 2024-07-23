/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['puppeteer-core', '@sparticuz/chromium'],
    // outputFileTracingRoot: path.join(process.cwd(), '../../'),
  },
};

export default nextConfig;
