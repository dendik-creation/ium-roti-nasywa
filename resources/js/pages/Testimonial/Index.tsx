import { PaginatorBuilder, SearchInput } from "@/components/custom/FormElement";
import { inputDebounce, ymdToIdDate } from "@/components/helper/helper";
import AppLayout from "@/partials/AppLayout";
import { PageTitle } from "@/partials/PageTitle";
import { TestimonialIndexProps } from "@/types/testimonial";
import { router, useForm } from "@inertiajs/react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useEffect, useRef } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import EmptyTable from "@/components/custom/EmptyTable";
import { Button } from "@/components/ui/button";

const TestimonialIndex = ({
    title,
    description,
    testimonials,
    search,
    rating,
}: TestimonialIndexProps) => {
    const firstRender = useRef(true);
    const { data: filterData, setData: setFilterData } = useForm({
        search: search || "",
        rating: rating || undefined,
    });

    const handleFilter = (key: keyof typeof filterData, value: string) => {
        setFilterData(key, value);
        if (key == "rating" && value == "0") {
            setFilterData(key, undefined);
        }
    };

    const debounceSearch = inputDebounce((data: typeof filterData) => {
        router.get(
            "/admin/testimonial",
            {
                search: data.search,
                rating: data.rating,
            },
            {
                preserveState: true,
                replace: true,
                only: ["testimonials"],
            },
        );
    });

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        debounceSearch(filterData);
    }, [filterData]);

    return (
        <AppLayout>
            <PageTitle title={title} description={description} />
            <div className="flex flex-col lg:flex-row gap-3 mb-4">
                <SearchInput
                    placeholder={`Cari nama pelanggan atau pengalamannya`}
                    className="lg:max-w-sm w-full"
                    onChange={(e) => handleFilter("search", e.target.value)}
                    value={filterData.search || ""}
                />
                <div className="flex items-center gap-3">
                    <span className="text-sm">Rating</span>
                    <div style={{ maxWidth: 180, width: "100%" }}>
                        <Rating
                            value={
                                filterData.rating
                                    ? Number(filterData.rating)
                                    : 0
                            }
                            onChange={(value: number) =>
                                handleFilter("rating", value.toString())
                            }
                        />
                    </div>
                    {filterData.rating && (
                        <Button
                            variant={"yellow"}
                            onClick={() => handleFilter("rating", "0")}
                            size={"sm"}
                        >
                            Reset Rating
                        </Button>
                    )}
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="bg-stone-200 font-semibold">
                                #
                            </TableHead>
                            <TableHead className="bg-stone-200 font-semibold">
                                Nama Pelanggan
                            </TableHead>
                            <TableHead className="bg-stone-200 font-semibold">
                                Rating
                            </TableHead>
                            <TableHead className="bg-stone-200 font-semibold">
                                Dibuat pada
                            </TableHead>
                            <TableHead className="bg-stone-200 font-semibold">
                                Pengalaman
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {testimonials.data.map((item, index: number) => (
                            <TableRow key={item.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.customer_name}</TableCell>
                                <TableCell>
                                    <Rating
                                        value={item.rating}
                                        readOnly
                                        style={{ maxWidth: 120 }}
                                    />
                                </TableCell>
                                <TableCell>
                                    {ymdToIdDate(item.created_at)}
                                </TableCell>
                                <TableCell>{item.comment}</TableCell>
                            </TableRow>
                        ))}
                        {testimonials.data.length == 0 && (
                            <EmptyTable
                                colSpan={5}
                                message="Testimoni tidak ada"
                            />
                        )}
                    </TableBody>
                </Table>
            </div>
            {testimonials.total > testimonials.per_page && (
                <PaginatorBuilder
                    prevUrl={testimonials.prev_page_url ?? "#"}
                    nextUrl={testimonials.next_page_url ?? "#"}
                    currentPage={testimonials.current_page}
                    totalPage={testimonials.last_page}
                />
            )}
        </AppLayout>
    );
};
export default TestimonialIndex;
