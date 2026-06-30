import Sidebar from "@/components/dashboard/Sidebar";

const DashboardLayout = ({ children }) => {
    return (
       <div className="w-full min-h-screen flex max-w-7xl mx-auto px-2 xl:px-0 mt-0.5">
            <Sidebar />
            <div className="flex-1 p-2 lg:p-10">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;