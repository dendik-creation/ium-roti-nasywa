import AppLayout from "@/partials/AppLayout";
import { PageTitle, PageTitleProps } from "@/partials/PageTitle copy";

type AdminDashboardProps = PageTitleProps & {};

const AdminDashboard = ({ title, description }: AdminDashboardProps) => {
    return (
        <AppLayout>
            <PageTitle title={title} description={description} />
        </AppLayout>
    );
};

export default AdminDashboard;
