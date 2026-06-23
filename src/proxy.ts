import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"], // Exclude paths "/api/*", "/_next/*", "/_vercel/*", "/*.*" - Restrict i18n middleware to work only on actual page routes
};
