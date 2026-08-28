import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // 跳过 /api, /_next, /baidu_verify
  matcher: ["/((?!api|_next|baidu_verify|.*\\..*).*)"],
};
