import UserCards from "@/components/admin/UserCards";
import UserContacts from "@/components/admin/UserContacts";
import UsersDetails from "@/components/admin/UsersDetails";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-5 gap-4">
      <div className="lg:col-span-5">
        <UserCards />
      </div>
      <div className="lg:col-span-5">
        <UsersDetails />
      </div>

      <div className="lg:col-span-5">
        <UserContacts />
      </div>
      {/* <div className="lg:col-span-3">
        <UsersDetails />
      </div>

      <div className="lg:col-span-2">
        <UserContacts />
      </div> */}
    </main>
  );
}
