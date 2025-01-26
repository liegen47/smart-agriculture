import UserListingPage from "@/components/admin-dashboard/user-table/user-listing-page";
import { EntityTablePage } from "@/components/admin-dashboard/user-table/entity-table-page";

export const metadata = {
  title: "Dashboard: Users",
};

export default function UsersPage() {
  return (
    <EntityTablePage
      title="Users"
      description="Manage Users (Server side table functionalities.)"
      // addButtonLabel="Add New User"
      // addButtonHref="/dashboard/users/new"
    >
      <UserListingPage endpoint="/admin/users" />
    </EntityTablePage>
  );
}
