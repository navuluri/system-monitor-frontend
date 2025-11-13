import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "**",
      },
      // Add GitHub Enterprise avatars if configured
      ...(process.env.GITHUB_ENTERPRISE_URL
        ? [
            {
              protocol: "https" as const,
              hostname: new URL(process.env.GITHUB_ENTERPRISE_URL).hostname,
              port: "",
              pathname: "**",
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
