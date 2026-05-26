import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * Shell Layout for the `/dashboard` route group.
 * Embeds the Sidebar on the left and the Navbar + scrollable content on the right.
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <Navbar />

        {/* Scrollable Sub-Page Render Viewport */}
        <main className="flex-1 overflow-y-auto p-6 focus:outline-hidden md:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
