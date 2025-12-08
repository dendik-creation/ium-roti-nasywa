import {
    PaginatorBuilder,
    SearchInput,
    SelectSearchInput,
} from "@/components/custom/FormElement";
import {
    floatToIdCurrency,
    handleElipsisText,
    inputDebounce,
} from "@/components/helper/helper";
import AppLayout from "@/partials/AppLayout";
import { PageTitle } from "@/Partials/PageTitle";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
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
import { Image, Trash2 } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import ConfirmDialog from "@/components/custom/ConfirmDialog";
import ModalProductCreate from "./ModalCreate";
import ModalProductEdit from "./ModalEdit";
import { Product, ProductIndexProps } from "@/types/product";
import ModalDetailImage from "./ModalDetailImage";

const ProductIndex = ({
    title,
    description,
    products,
    categories,
    search,
    category,
}: ProductIndexProps) => {
    const firstRender = useRef(true);
    const { data: filterData, setData: setFilterData } = useForm({
        search: search || "",
        category: category || "",
    });

    const [modalImages, setModalImages] = useState({
        isOpen: false,
        images: [] as string[],
        product_name: "",
    });

    const handleFilter = (key: keyof typeof filterData, value: string) => {
        setFilterData(key, value);
    };

    const debounceFilter = inputDebounce((data: typeof filterData) => {
        router.get(
            "/admin/product",
            {
                search: data.search,
                category: data.category || null,
            },
            {
                preserveState: true,
                replace: true,
                only: ["products"],
            },
        );
    });

    const handleOpenImages = (product_name: string, images: string[]) => {
        setModalImages({
            isOpen: !modalImages.isOpen,
            images: images,
            product_name: product_name,
        });
    };

    const handleDelete = (id: number) => {
        router.delete(`/admin/product/${id}`, {
            preserveScroll: true,
            replace: true,
            only: ["products"],
        });
    };

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        debounceFilter(filterData);
    }, [filterData]);

    return (
        <AppLayout>
            <PageTitle title={title} description={description} />
            {/* Filters & New Btn */}
            <div className="flex justify-start flex-col lg:flex-row lg:justify-between gap-3 lg:gap-0 items-center mb-4">
                <div className="flex flex-col lg:flex-row items-center gap-2 w-full">
                    <SearchInput
                        placeholder="Cari nama produk"
                        className="lg:max-w-sm w-full"
                        onChange={(e) => handleFilter("search", e.target.value)}
                        value={filterData.search || ""}
                    />
                    <div className="w-full lg:max-w-xs">
                        <SelectSearchInput
                            options={categories}
                            value={filterData.category.toString() || ""}
                            onChange={(value) =>
                                handleFilter("category", value.toString())
                            }
                            placeholder="Pilih Kategori"
                            removeValue={() => handleFilter("category", "")}
                        />
                    </div>
                </div>
                <ModalProductCreate />
                <ModalDetailImage
                    images={modalImages.images}
                    product_name={modalImages.product_name}
                    isOpen={modalImages.isOpen}
                    onOpenChange={(open: boolean) =>
                        setModalImages((prev) => ({
                            ...prev,
                            isOpen: open,
                        }))
                    }
                />
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="bg-stone-200 font-semibold">
                                #
                            </TableHead>
                            <TableHead className="bg-stone-200 font-semibold">
                                Gambar
                            </TableHead>
                            <TableHead className="bg-stone-200 font-semibold">
                                Nama Produk
                            </TableHead>
                            <TableHead className="bg-stone-200 font-semibold">
                                Harga
                            </TableHead>
                            <TableHead className="bg-stone-200 font-semibold">
                                Kategori
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
                        {products.data.map(
                            (product: Product, index: number) => (
                                <TableRow key={product.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        {product.images.length > 0 ? (
                                            <Button
                                                onClick={() =>
                                                    handleOpenImages(
                                                        product.name,
                                                        product.images,
                                                    )
                                                }
                                                variant={"outline"}
                                            >
                                                <Image />
                                                <span>Lihat Gambar</span>
                                            </Button>
                                        ) : (
                                            "-"
                                        )}
                                    </TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>
                                        {floatToIdCurrency(product.price)}
                                    </TableCell>
                                    <TableCell>
                                        {product.category?.name || "-"}
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip delayDuration={200}>
                                            <TooltipTrigger>
                                                {handleElipsisText(
                                                    product.description || "",
                                                    60,
                                                )}
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>
                                                    {product.description || ""}
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <ModalProductEdit
                                                product={product}
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
                                                title="Hapus produk"
                                                description="Produk yang dihapus tidak dapat dikembalikan. Apakah anda yakin?"
                                                type="danger"
                                                confirmAction={() =>
                                                    handleDelete(product.id)
                                                }
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ),
                        )}
                        {products.data.length === 0 && (
                            <EmptyTable
                                colSpan={6}
                                message="Produk tidak ada"
                            />
                        )}
                    </TableBody>
                </Table>
            </div>

            {products.total > products.per_page && (
                <PaginatorBuilder
                    prevUrl={products.prev_page_url ?? "#"}
                    nextUrl={products.next_page_url ?? "#"}
                    currentPage={products.current_page}
                    totalPage={products.last_page}
                />
            )}
        </AppLayout>
    );
};

export default ProductIndex;
