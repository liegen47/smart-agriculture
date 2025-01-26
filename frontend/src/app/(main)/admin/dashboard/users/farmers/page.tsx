import { EntityTablePage } from "@/components/admin-dashboard/user-table/entity-table-page";
import UserListingPage from "@/components/admin-dashboard/user-table/user-listing-page";

export const metadata = {
  title: "Dashboard: Farmers",
};

export default function FarmersPage() {
  return (
    <EntityTablePage
      title="Farmers"
      description="Manage Farmers "
      // addButtonLabel="Add New Farmer"
      // addButtonHref="/dashboard/farmers/new"
    >
      <UserListingPage endpoint="/admin/farmers" />
    </EntityTablePage>
  );
}
