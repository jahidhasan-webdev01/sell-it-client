'use client'

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = ({ categories }) => {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    const user = session?.user;

    const navLinks = [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "Products",
            href: "/products",
        },
        {
            label: "Categories",
            href: "#",
        }
    ];

    const dynamicDashboardLinksByRole = {
        SELLER: "/dashboard/seller",
        BUYER: "/dashboard/buyer",
        ADMIN: "/dashboard/admin"
    }

    if (!isPending && user?.id) {
        navLinks.push({
            label: "Dashboard",
            href: dynamicDashboardLinksByRole[user?.role || "BUYER"]
        })
    }

    const handleLogOut = async () => {
        await authClient.signOut();
        router.push("/");
    }

    return (
        <div className="bg-base-100 shadow-sm">
            <div className="max-w-7xl mx-auto navbar">
                <div className="navbar-start">
                    <div className="dropdown lg:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>

                        {isPending ? (
                            <span className="loading loading-spinner loading-md"></span>
                        ) : (
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-56 p-2 shadow z-[100]"
                            >
                                {navLinks.map(({ label, href }) =>
                                    label !== "Categories" ? (
                                        <li key={label}>
                                            <Link href={href}>{label}</Link>
                                        </li>
                                    ) : (
                                        <li key={label}>
                                            <details>
                                                <summary>Categories</summary>
                                                <ul>
                                                    {categories.map(({ name, slug }) => (
                                                        <li key={slug}>
                                                            <Link href={`/categories/${slug}`}>
                                                                {name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </details>
                                        </li>
                                    )
                                )}
                            </ul>
                        )}
                    </div>

                    <Link href="/" className="text-2xl font-bold">
                        Sell It
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    {isPending ? (
                        <span className="loading loading-spinner loading-md"></span>
                    ) : (
                        <ul className="menu menu-horizontal px-1 items-center">
                            {navLinks.map(({ label, href }) =>
                                label !== "Categories" ? (
                                    <li key={label}>
                                        <Link href={href}>{label}</Link>
                                    </li>
                                ) : (
                                    <li key={label}>
                                        <div className="dropdown dropdown-hover">
                                            <div tabIndex={0} role="button" className="cursor-pointer">
                                                Categories
                                            </div>

                                            <ul
                                                tabIndex={0}
                                                className="dropdown-content menu bg-base-100 rounded-box w-56 shadow-lg z-[100]"
                                            >
                                                {categories.map(({ name, slug }) => (
                                                    <li key={slug}>
                                                        <Link href={`/categories/${slug}`}>
                                                            {name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </li>
                                )
                            )}
                        </ul>
                    )}
                </div>

                <div className="navbar-end flex gap-2">
                    {isPending ? (
                        <span className="loading loading-spinner loading-md"></span>
                    ) : user?.id ? (
                        <button
                            onClick={handleLogOut}
                            className="btn btn-sm btn-soft rounded-full"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="btn btn-sm btn-soft rounded-full"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="btn btn-sm btn-primary rounded-full"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;