'use client';

import Image from 'next/image';
import { FiTrash2 } from 'react-icons/fi';
import { deleteUser, updateUserStatus } from '@/lib/actions/users';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function UsersTable({ users }) {
    const router = useRouter();
    const handleStatusChange = async (userId, newStatus) => {
        try {
            const response = await updateUserStatus(userId, newStatus);

            if (!response || response.modifiedCount === 0) {
                toast.error("Status could not be updated");
            } else {
                toast.success(`Status updated to ${newStatus}`);
                router.refresh();
            }
        } catch (error) {
            toast.error("Failed to connect to the server");
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!confirm("Are you absolutely sure you want to delete this user?")) return;

        try {
            const response = await deleteUser(userId);

            if (response && response.deletedCount > 0) {
                toast.success("User account deleted successfully");
                router.refresh();
            } else {
                toast.error("User could not be deleted or was not found");
            }
        } catch (error) {
            toast.error("Failed to connect to the server");
        }
    };

    return (
        <div className="w-full bg-base-100 rounded-2xl shadow-sm border border-base-300 overflow-hidden">
            <div className="w-full max-w-full overflow-x-auto max-h-[calc(100vh-220px)] overflow-y-auto block">
                <table className="table table-zebra w-full min-w-[900px] table-auto border-separate border-spacing-0">
                    <thead className="sticky top-0 z-10 bg-base-100">
                        <tr className="bg-base-200/80 backdrop-blur-sm text-base-content/80 shadow-[0_1px_0_0_rgba(0,0,0,0.1)]">
                            <th className="w-16 bg-inherit">Profile</th>
                            <th className="w-44 bg-inherit">Name</th>
                            <th className="bg-inherit">Email</th>
                            <th className="w-36 bg-inherit">Phone</th>
                            <th className="w-24 bg-inherit">Role</th>
                            <th className="w-40 bg-inherit">Location</th>
                            <th className="w-36 bg-inherit">Status Control</th>
                            <th className="w-20 text-center bg-inherit">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center py-12 text-base-content/50 font-medium">
                                    No users found in database.
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user._id} className="hover:bg-base-200/30 transition-colors align-middle">
                                    <td>
                                        <div className="avatar">
                                            <div className="w-10 h-10 rounded-xl bg-base-300 relative overflow-hidden ring-1 ring-base-content/5">
                                                <Image
                                                    src={user.image || "https://i.ibb.co/YTtLPJ3B/Screenshot-2026-06-10-193933.png"}
                                                    alt={user.name || "User profile"}
                                                    fill
                                                    sizes="40px"
                                                    className="object-cover"
                                                    priority={false}
                                                />
                                            </div>
                                        </div>
                                    </td>

                                    <td className="font-semibold text-sm max-w-[176px] truncate">
                                        {user.name}
                                    </td>
                                    <td className="text-sm max-w-[200px] truncate font-medium text-base-content/80">
                                        {user.email}
                                    </td>
                                    <td className="text-sm font-mono whitespace-nowrap tracking-tight text-base-content/70">
                                        {user.phone || '—'}
                                    </td>

                                    <td>
                                        <span className={`badge badge-sm font-bold tracking-wide ${
                                            user.role === 'ADMIN' ? 'badge-secondary' : 
                                            user.role === 'SELLER' ? 'badge-primary' : 'badge-ghost'
                                        }`}>
                                            {user?.role}
                                        </span>
                                    </td>

                                    <td className="text-sm max-w-[160px] truncate text-base-content/70">
                                        {user.location || '—'}
                                    </td>

                                    <td>
                                        <select
                                            value={user.status || "PENDING"}
                                            onChange={(e) => handleStatusChange(user._id, e.target.value)}
                                            className={`select select-bordered select-xs w-28 font-bold rounded-lg transition-all focus:outline-none ${
                                                user.status === "APPROVED" ? "text-success border-success/30 bg-success/5" :
                                                user.status === "BLOCKED" ? "text-error border-error/30 bg-error/5" :
                                                "text-warning border-warning/30 bg-warning/5"
                                            }`}
                                        >
                                            <option value="PENDING" className="text-warning bg-base-100 font-semibold">PENDING</option>
                                            <option value="APPROVED" className="text-success bg-base-100 font-semibold">APPROVED</option>
                                            <option value="BLOCKED" className="text-error bg-base-100 font-semibold">BLOCKED</option>
                                        </select>
                                    </td>

                                    <td className="text-center">
                                        <button
                                            onClick={() => handleDeleteUser(user._id)}
                                            className="btn btn-ghost btn-sm text-error hover:bg-error/10 btn-square rounded-xl"
                                            title="Delete User Account"
                                        >
                                            <FiTrash2 className="text-lg" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}