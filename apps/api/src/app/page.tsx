import { redirect } from "next/navigation";

export default function Home() {
	// Redirect to API playground
	redirect("/api");
}

