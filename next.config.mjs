import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();
export default withMDX({
  // Let unknown routes reach the 404 page during development.
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  agentRules: false,
});
