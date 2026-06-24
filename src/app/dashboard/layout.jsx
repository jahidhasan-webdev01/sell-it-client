import Sidebar from "@/components/dashboard/Sidebar";

const DashboardLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex mt-0.5">
            <Sidebar />
            <div className="flex-1 p-2 lg:p-10">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;