import withMDX from '@next/mdx';

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
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'], // Extend page extensions to include MDX
};

export default withMDX({
  extension: /\.mdx?$/, // Match both .md and .mdx files
})(nextConfig);
