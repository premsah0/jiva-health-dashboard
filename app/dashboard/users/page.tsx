import { UserList } from "@/components/users/user-list";

export const metadata = {
  title: "User Management | JivaHealth",
  description: "Manage client and healthcare provider directories on the Jiva platform.",
};

export default function UsersPortalPage() {
  return (
    <div className="animate-fadeIn">
      <UserList />
    </div>
  );
}
