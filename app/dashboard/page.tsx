import { redirect } from "next/navigation";

/**
 * Dashboard index — redirects to User Management as the primary view.
 */
export default function DashboardPage() {
  redirect("/dashboard/users");
}
