import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";

// import node from '@astrojs/node';
// import { server } from './src/actions';

// https://astro.build/config
export default defineConfig({
  output: "static",
  integrations: [tailwind()],
  adapter: node({
    mode: "standalone",
  }),
  experimental: {
    // @ts-ignore
    session: {
      driver: "fs",
      // If set to a string, this will be used as the cookie name
      // cookie: "my-session-id",
      // If set to an object, this will allow advanced options to be set
      cookie: {
        name: "my-session-id",
        sameSite: "none",
      },
    },
  },
});
