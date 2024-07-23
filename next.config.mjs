/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['puppeteer-core', '@sparticuz/chromium'],
    outputFileTracingRoot: path.join(__dirname, 'tmp/'),
  },
};

export default nextConfig;
