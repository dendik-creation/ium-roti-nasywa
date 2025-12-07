import AppLayout from "@/partials/AppLayout";
import { PageTitle, PageTitleProps } from "@/partials/PageTitle";

type AdminDashboardProps = PageTitleProps & {};

const AdminDashboard = ({ title, description }: AdminDashboardProps) => {
    return (
        <AppLayout>
            <PageTitle title={title} description={description} />
        </AppLayout>
    );
};

export default AdminDashboard;
