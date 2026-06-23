import Link from "next/link";

const Navbar = () => {
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
            href: "/categories",
        }
    ];

    return (
        <div className=" bg-base-100 shadow-sm">
            <div className="max-w-7xl mx-auto navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {
                                navLinks.map(({ label, href }, index) => {
                                    return <li key={index}><Link href={href}>{label}</Link></li>
                                })
                            }
                        </ul>
                    </div>
                    <Link href="/" className="text-2xl font-bold">Sell It</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            navLinks.map(({ label, href }, index) => {
                                return <li key={index}><Link href={href}>{label}</Link></li>
                            })
                        }
                    </ul>
                </div>
                <div className="navbar-end flex flex-row gap-2">
                    <Link href="/login" className="btn btn-sm btn-soft rounded-full">login</Link>
                    <Link href="/register" className="btn btn-sm btn-primary rounded-full">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;