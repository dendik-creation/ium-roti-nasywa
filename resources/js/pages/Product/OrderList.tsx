import { useState, useEffect } from "react";
import AppLayout from "@/partials/AppLayout";
import { PageTitle, PageTitleProps } from "@/partials/PageTitle";
import { useForm } from "@inertiajs/react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Save, X } from "lucide-react";
import axios from "axios";
import BlastToaster from "@/components/custom/BlastToaster";
import { Button } from "@/components/ui/button";

type Product = {
    id: number;
    name: string;
    category_name: string;
    image: string | null;
};

type PageProps = PageTitleProps & {
    products: Product[];
};
const SortableItem = ({
    product,
    index,
}: {
    product: Product;
    index: number;
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: product.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 1,
        opacity: isDragging ? 0.8 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`
                group relative flex flex-col bg-white rounded-xl border shadow-sm
                hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing touch-none
                ${isDragging ? "ring-2 ring-yellow-500 shadow-xl" : "border-gray-200"}
            `}
            {...attributes}
            {...listeners}
        >
            <div className="absolute top-2 left-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-600 text-sm font-bold text-white shadow-md">
                {index + 1}
            </div>

            <div className="aspect-square w-full overflow-hidden rounded-t-xl bg-gray-100 relative">
                {product.image ? (
                    <img
                        src={`/storage/${product.image}`}
                        alt={product.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        draggable={false}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                        <svg
                            className="w-12 h-12"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            ></path>
                        </svg>
                    </div>
                )}

                {/* Overlay Icon Drag (Visual Cue) */}
                <div className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur rounded-md text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                </div>
            </div>

            {/* Detail Produk */}
            <div className="flex flex-1 flex-col p-4">
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight">
                    {product.name}
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                    {product.category_name || "Uncategorized"}
                </p>
            </div>
        </div>
    );
};

// --- Main Component ---
const ProductOrderList = ({ title, description, products }: PageProps) => {
    const [items, setItems] = useState<Product[]>(products);
    const { put, processing } = useForm({});

    // Sync state jika props berubah (opsional, untuk konsistensi)
    useEffect(() => {
        setItems(products);
    }, [products]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // Jarak drag min 8px agar tidak mengganggu klik/tap biasa
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex(
                    (item) => item.id === active.id,
                );
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleSaveOrder = () => {
        const orderedIds = items.map((item) => item.id);
        axios
            .post("/admin/product/order-list/update", {
                ordered_ids: orderedIds,
            })
            .then(() => {
                BlastToaster("success", "Urutan produk berhasil disimpan");
            })
            .catch((error) => {
                console.error(error);
                BlastToaster("error", "Terjadi kesalahan");
            });
    };

    return (
        <AppLayout>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <PageTitle title={title} description={description} />
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={() => window.history.back()}
                        disabled={processing}
                    >
                        <X />
                        Batal
                    </Button>
                    <Button
                        variant={"green"}
                        onClick={handleSaveOrder}
                        disabled={processing}
                    >
                        <Save />
                        <span>Simpan Urutan</span>
                    </Button>
                </div>
            </div>

            {/* Grid Drag Area */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={items.map((item) => item.id)}
                    strategy={rectSortingStrategy} // Menggunakan strategi Grid (X & Y axis)
                >
                    {/* Konfigurasi Grid Responsif */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {items.map((product, index) => (
                            <SortableItem
                                key={product.id}
                                product={product}
                                index={index} // Mengirim index untuk ditampilkan sebagai nomor urut
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </AppLayout>
    );
};

export default ProductOrderList;
