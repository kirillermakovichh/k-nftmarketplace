require("dotenv").config();
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
};

module.exports = {
  target: "server",
  images: {
    disableStaticImages: true,
    unoptimized: true,
  },
  // async rewrites() {
  // return [
  //     {
  //       source: "/api/path/that/should/return/404",
  //       destination: "/404",
  //     },
  //   ]
  // },
  exportPathMap: async function (defaultPathMap) {
    return {
      "/": { page: "/index" },
      "/owned": { page: "/owned" },
      "/create": { page: "/create" },
      ...defaultPathMap,
    };
  },
};
