'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiHome, FiLogOut, FiUser, FiX } from "react-icons/fi";
import { CgAdd, CgProductHunt } from "react-icons/cg";
import {
    MdOutlineBookmarkBorder,
    MdOutlineManageAccounts,
    MdOutlineAnalytics,
    MdOutlineHistory
} from "react-icons/md";
import { GrOrderedList, GrAnalytics } from "react-icons/gr";
import { TbLayoutDashboardFilled } from 'react-icons/tb';
import { IoBagCheck } from 'react-icons/io5';
import { authClient } from '@/lib/auth-client';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    const buyerNavItems = [
        { icon: FiHome, label: "Dashboard Overview", href: "/dashboard/buyer" },
        { icon: IoBagCheck, label: "My Orders", href: "/dashboard/buyer/my-orders" },
        { icon: MdOutlineBookmarkBorder, label: "Wishlist", href: "/dashboard/buyer/wishlist" },
        { icon: MdOutlineHistory, label: "Payment History", href: "/dashboard/buyer/payment-history" },
        { icon: MdOutlineManageAccounts, label: "Profile Management", href: "/dashboard/buyer/profile" },
    ];

    const sellerNavItems = [
        { icon: FiHome, label: "Dashboard Overview", href: "/dashboard/seller" },
        { icon: CgAdd, label: "Add Product", href: "/dashboard/seller/add-product" },
        { icon: CgProductHunt, label: "My Products", href: "/dashboard/seller/my-products" },
        { icon: GrOrderedList, label: "Manage Orders", href: "/dashboard/seller/manage-orders" },
        { icon: GrAnalytics, label: "Sales Analytics", href: "/dashboard/seller/sales-analytics" },
    ];

    const adminNavItems = [
        { icon: FiHome, label: "Dashboard Overview", href: "/dashboard/admin" },
        { icon: FiUser, label: "Manage Users", href: "/dashboard/admin/manage-users" },
        { icon: CgProductHunt, label: "Manage Products", href: "/dashboard/admin/manage-products" },
        { icon: GrOrderedList, label: "Manage Orders", href: "/dashboard/admin/manage-orders" },
        { icon: MdOutlineAnalytics, label: "Platform Analytics", href: "/dashboard/admin/platform-analytics" },
    ];

    const dynamicNavLinksByRole = {
        BUYER: buyerNavItems,
        SELLER: sellerNavItems,
        ADMIN: adminNavItems
    }

    const currentRole = mounted ? (user?.role || "BUYER") : "BUYER";
    const navItems = dynamicNavLinksByRole[currentRole];

    const toggleSidebar = () => setIsOpen(!isOpen);

    const handleLogOut = async () => {
        await authClient.signOut();
        router.push("/");
    }

    return (

        <div className="min-h-screen bg-base-200 flex flex-col lg:flex-row">
            <div className="lg:hidden flex items-center justify-between px-4 py-3 sticky top-0 z-40">
                <button
                    onClick={toggleSidebar}
                    className="btn btn-ghost btn-sm btn-square text-xl"
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <FiX /> : <TbLayoutDashboardFilled />}
                </button>
            </div>

            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/40 z-40 transition-opacity"
                    onClick={toggleSidebar}
                />
            )}

            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-base-100 border-r border-base-300 flex flex-col justify-between
                transform transition-transform duration-300 ease-in-out
                lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>

                <div className="flex flex-col gap-6 pt-6 overflow-y-auto">
                    <div className="hidden lg:block px-6">
                        <p className="text-xs text-base-content/50 font-medium mt-0.5">{currentRole} Dashboard</p>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="px-3">
                        <ul className="menu w-full gap-1 p-0">
                            {navItems.map((item, index) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;
                                return (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all group ${isActive
                                                ? 'bg-primary text-primary-content active:bg-primary'
                                                : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'
                                                }`}
                                        >
                                            <Icon className={`text-lg shrink-0 ${isActive ? '' : 'text-base-content/40 group-hover:text-primary'}`} />
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>

                <div className="p-4 border-t border-base-200">
                    <button
                        onClick={() => handleLogOut}
                        className="btn btn-sm btn-ghost text-error hover:bg-error/10 w-full justify-start gap-3 rounded-xl normal-case h-11 px-4"
                    >
                        <FiLogOut className="text-lg" />
                        Logout Account
                    </button>
                </div>
            </aside>
        </div>

    );
}