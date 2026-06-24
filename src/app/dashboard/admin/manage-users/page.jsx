import PageHeading from "@/components/dashboard/PageHeading";
import { getAllUsers } from "@/lib/api/users";
import UsersTable from "./UserTable";
import EmptyState from "@/components/empty/EmptyState";

const ManageUsersPage = async () => {
    const users = await getAllUsers() || [];

    return (
        <div className="space-y-6">
            <PageHeading title="All Users" subtitle="Monitor accounts, adjust roles, alter statuses, or revoke privileges." />

            {
                users.length > 0 ?
                    <UsersTable users={users} />
                    :
                    <EmptyState title="No User Found" />
            }
        </div>
    );
};

export default ManageUsersPage;