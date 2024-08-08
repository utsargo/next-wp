/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'next-wp.thoughtsmate.com',
            pathname: '/**',
        },
        {
            protocol: 'https',
            hostname: 'secure.gravatar.com',
            pathname: '/**',
        },
    ],
},
    i18n: {
      locales: ['en', 'bn'],
      defaultLocale: 'bn',
      localeDetection: false,
    },
  };
  
  export default nextConfig;
  