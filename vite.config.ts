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
          // Root
          route("/", "routes/index.tsx");
          // Auth Pages
          route("/login", "routes/auth/login.tsx"); 
          route("/logout", "routes/auth/logout.tsx");
          route("/signup", "routes/auth/signup.tsx");

          // Other Pages
          route("/currency", "routes/utils/currency.tsx");
          route("/error", "routes/utils/error.tsx");

          // Finance - Main Application for Authenticated Users
          route("/", "routes/finance/layout.tsx", () => {
            route("charts", "routes/finance/charts/index.tsx");
            route("overview", "routes/finance/overview/index.tsx");
            route("plannings", "routes/finance/plannings/index.tsx");
            route("transactions", "routes/finance/transactions/index.tsx");
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
