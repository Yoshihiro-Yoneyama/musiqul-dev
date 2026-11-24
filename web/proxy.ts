// Next.js の proxy（旧 middleware）。実装は src/app/proxy に置く
export { authProxy as proxy } from "@/app/proxy";

export const config = {
  matcher: ["/((?!_next/|favicon\\.ico).*)"],
};
