import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ['**/*'],
      routes: async (defineRoutes) => {
        return defineRoutes((route) => {
          // Auth Pages
          route("/login", "routes/auth/login.tsx"); 
          route("/logout", "routes/auth/logout.tsx");
          route("/signup", "routes/auth/signup.tsx");

          // Other Pages
          route("/currency", "routes/currency.tsx");
          route("/error", "routes/error.tsx");

          // Finance - Main Application for Authenticated Users
          route("/", "routes/_finance/_index.tsx", () => {
            route("charts", "routes/_finance/charts/_index.tsx");
            route("overview", "routes/_finance/overview/_index.tsx");
            route("plannings", "routes/_finance/plannings/_index.tsx");
            route("transactions", "routes/_finance/transactions/_index.tsx");
          });
        });
      },
      future: {
        v3_fetcherPersist: true,
        v3_lazyRouteDiscovery: true,
        v3_relativeSplatPath: true,
        v3_singleFetch: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
});
