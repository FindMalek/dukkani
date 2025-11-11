import type { NextConfig } from "next";
import "./src/env";

const nextConfig: NextConfig = {
	typedRoutes: true,
	reactCompiler: true,
};

export default nextConfig;
