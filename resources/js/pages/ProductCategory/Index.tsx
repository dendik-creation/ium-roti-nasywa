import { PaginatorBuilder, SearchInput } from "@/components/custom/FormElement";
import { handleElipsisText, inputDebounce } from "@/components/helper/helper";
import AppLayout from "@/partials/AppLayout";
import { PageTitle } from "@/Partials/PageTitle";
import { ProductCategoryIndexProps } from "@/types/product_category";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useRef } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import EmptyTable from "@/components/custom/EmptyTable";
import { Trash2 } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import ModalCategoryCreate from "./ModalCreate";
import ModalCategoryEdit from "./ModalEdit";
import ConfirmDialog from "@/components/custom/ConfirmDialog";

const ProductCategoryIndex = ({
    title,
    description,
    categories,
    search,
}: ProductCategoryIndexProps) => {
    const firstRender = useRef(true);
    const { data: filterData, setData: setFilterData } = useForm({
        search: search || "",
    });

    const handleFilter = (key: keyof typeof filterData, value: string) => {
        setFilterData(key, value);
    };

    const debounceSearch = inputDebounce((data: typeof filterData) => {
        router.get(
            "/admin/category",
            {
                search: data.search,
            },
            {
                preserveState: true,
                replace: true,
                only: ["categories"],
            },
        );
    });

    const handleDelete = (id: number) => {
        router.delete(`/admin/category/${id}`, {
            preserveScroll: true,
            replace: true,
            only: ["categories"],
        });
    };

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
            {/*Filters & New Btn*/}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 w-full">
                    <SearchInput
                        placeholder={`Cari nama kategori produk`}
                        className="lg:max-w-sm w-full"
                        onChange={(e) => handleFilter("search", e.target.value)}
                        value={filterData.search || ""}
                    />
                </div>
                <ModalCategoryCreate />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="bg-stone-200 font-semibold">
                                #
                            </TableHead>
                            <TableHead className="bg-stone-200 font-semibold">
                                Nama Kategori
                            </TableHead>
                            <TableHead className="bg-stone-200 font-semibold">
                                Deskripsi
                            </TableHead>
                            <TableHead className="bg-stone-200 font-semibold">
                                Aksi
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.data.map((category: any, index: number) => (
                            <TableRow key={category.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>
                                    <Tooltip delayDuration={200}>
                                        <TooltipTrigger asChild>
                                            <span>
                                                {handleElipsisText(
                                                    category.description || "",
                                                    60,
                                                )}
                                            </span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{category.description || ""}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <ModalCategoryEdit
                                            category={category}
                                        />
                                        <ConfirmDialog
                                            triggerNode={
                                                <span>
                                                    <Button
                                                        variant={"red"}
                                                        size={"icon"}
                                                    >
                                                        <Trash2 />
                                                    </Button>
                                                </span>
                                            }
                                            title="Hapus kategori"
                                            description="Menghapus kategori menyebabkan hilangnya kategori pada produk yang telah digunakan. Apakah anda yakin ?"
                                            type="danger"
                                            confirmAction={() =>
                                                handleDelete(category.id)
                                            }
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {categories.data.length == 0 && (
                            <EmptyTable
                                colSpan={4}
                                message="Kategori tidak ada"
                            />
                        )}
                    </TableBody>
                </Table>
            </div>
            {categories.total > categories.per_page && (
                <PaginatorBuilder
                    prevUrl={categories.prev_page_url ?? "#"}
                    nextUrl={categories.next_page_url ?? "#"}
                    currentPage={categories.current_page}
                    totalPage={categories.last_page}
                />
            )}
        </AppLayout>
    );
};
export default ProductCategoryIndex;
