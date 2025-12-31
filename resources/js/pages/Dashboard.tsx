import DynamicCard from "@/components/custom/DynamicCard";
import AppLayout from "@/partials/AppLayout";
import { PageTitle, PageTitleProps } from "@/partials/PageTitle";
import { Testimonial } from "@/types/testimonial";
import { Bubbles, Package, PackageSearch } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactApexChart from "react-apexcharts";
import EmptyChart from "@/components/custom/EmptyChart";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ymdToIdDate } from "@/components/helper/helper";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import EmptyTable from "@/components/custom/EmptyTable";

type DonutChartData = {
    rating: number;
    count: number;
};

type AdminDashboardProps = PageTitleProps & {
    total_category: number;
    total_product: number;
    total_testimonial: number;
    donut_chart_testimonial: DonutChartData[];
    latest_testimonials: Testimonial[];
};

const AdminDashboard = ({
    title,
    description,
    total_category,
    total_product,
    total_testimonial,
    donut_chart_testimonial,
    latest_testimonials,
}: AdminDashboardProps) => {
    const testimonialRatingSeries = donut_chart_testimonial.map(
        (item) => item.count,
    );
    const testimonialRatingLabels = donut_chart_testimonial.map(
        (item) => `Bintang ${item.rating}`,
    );
    const testimonialOptions = {
        chart: {
            type: "donut" as const,
        },
        labels: testimonialRatingLabels,
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 300,
                    },
                    legend: {
                        position: "bottom" as const,
                    },
                },
            },
        ],
    };
    return (
        <AppLayout>
            <div className="flex items-center justify-between mb-4 px-1">
                <PageTitle title={title} description={description} />
            </div>

            {/*KPI*/}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <DynamicCard
                    title="Total Kategori"
                    value={total_category}
                    icon={
                        <PackageSearch size={120} className="text-green-200" />
                    }
                    color="green"
                />
                <DynamicCard
                    title="Total Produk"
                    value={total_product}
                    icon={<Package size={120} className="text-blue-200" />}
                    color="blue"
                />
                <DynamicCard
                    title="Testimoni Tercatat"
                    value={total_testimonial}
                    icon={<Bubbles size={120} className="text-yellow-200" />}
                    color="yellow"
                />
            </div>
            {/*Donut testimoni table & Latest testimonial table*/}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/*Donut Chart Testimoni*/}
                <Card>
                    <CardHeader>
                        <CardTitle>Grafik Testimoni Pelanggan</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Menampilkan testimoni pelanggan berdasarkan rating
                            (bintang)
                        </p>
                    </CardHeader>
                    <CardContent>
                        {testimonialRatingSeries.length > 0 ? (
                            <ReactApexChart
                                options={testimonialOptions}
                                series={testimonialRatingSeries}
                                type="donut"
                                height={320}
                            />
                        ) : (
                            <EmptyChart type="DONUT" />
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Testimoni Pelanggan Terbaru</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            5 testimoni pelanggan terbaru
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="bg-stone-200 font-semibold">
                                            #
                                        </TableHead>
                                        <TableHead className="bg-stone-200 font-semibold">
                                            Tanggal
                                        </TableHead>
                                        <TableHead className="bg-stone-200 font-semibold">
                                            Nama Pelanggan
                                        </TableHead>
                                        <TableHead className="bg-stone-200 font-semibold">
                                            Rating
                                        </TableHead>
                                        <TableHead className="bg-stone-200 font-semibold">
                                            Pengalaman
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {latest_testimonials.map(
                                        (testimonial, index) => (
                                            <TableRow key={testimonial.id}>
                                                <TableCell>
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell>
                                                    {ymdToIdDate(
                                                        testimonial.created_at,
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {testimonial.customer_name}
                                                </TableCell>
                                                <TableCell>
                                                    <Rating
                                                        value={
                                                            testimonial.rating
                                                        }
                                                        readOnly
                                                        style={{
                                                            maxWidth: 120,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    {testimonial.comment
                                                        .length > 50
                                                        ? testimonial.comment.slice(
                                                              0,
                                                              50,
                                                          ) + "..."
                                                        : testimonial.comment}
                                                </TableCell>
                                            </TableRow>
                                        ),
                                    )}
                                    {latest_testimonials.length == 0 && (
                                        <EmptyTable
                                            colSpan={5}
                                            message="Testimoni tidak ada"
                                        />
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default AdminDashboard;
