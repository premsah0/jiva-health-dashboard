import { redirect } from "next/navigation";

/**
 * Root page — immediately redirects to the User Management dashboard.
 */
export default function Home() {
  redirect("/dashboard/users");
}
