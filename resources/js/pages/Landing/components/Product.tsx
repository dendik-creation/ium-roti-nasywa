import { useState } from "react";
import { Product as ProductType } from "@/types/product";
import { SelectOption } from "@/types/global";
import { ShoppingCart, Eye, CakeSlice } from "lucide-react";
import ProductDetail from "./ProductDetail";
import { cn } from "@/lib/utils";
import { floatToIdCurrency } from "@/components/helper/helper";

interface ProductSectionProps {
    products: ProductType[];
    categories: SelectOption[];
    onAddToCart: (product: ProductType, quantity: number) => void;
}

export default function ProductSection({
    products,
    categories,
    onAddToCart,
}: ProductSectionProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | number>(
        "all",
    );
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
        null,
    );
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const filteredProducts =
        selectedCategory === "all"
            ? products
            : products.filter((p) => p.category_id === selectedCategory);

    const handleOpenDetail = (product: ProductType) => {
        setSelectedProduct(product);
        setIsDetailOpen(true);
    };

    return (
        <section id="products" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="text-[#B46B30] font-semibold tracking-wider uppercase text-lg">
                        Produk Kami
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#2A1E12] mt-3">
                        Menu <span className="text-[#B46B30]">Spesial</span>
                    </h2>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Nikmati berbagai pilihan roti dan kue segar yang dibuat
                        dengan cinta setiap hari.
                    </p>
                </div>

                {/* Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    <button
                        onClick={() => setSelectedCategory("all")}
                        className={cn(
                            "px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer",
                            selectedCategory === "all"
                                ? "bg-[#B46B30] text-white shadow-lg"
                                : "bg-[#FFFCF7] text-[#784421] hover:bg-[#E8B888] hover:text-white",
                        )}
                    >
                        Semua
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.value}
                            onClick={() => setSelectedCategory(cat.value)}
                            className={cn(
                                "px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer",
                                selectedCategory === cat.value
                                    ? "bg-[#B46B30] text-white shadow-lg"
                                    : "bg-[#FFFCF7] text-[#784421] hover:bg-[#E8B888] hover:text-white",
                            )}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="mb-6">
                            <CakeSlice className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#2A1E12] mb-2">
                            Belum Ada Produk
                        </h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                            Produk sedang dalam proses persiapan. Silakan
                            kembali lagi nanti untuk melihat menu spesial kami.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map((product) => {
                            const images =
                                product.images && product.images.length > 0
                                    ? product.images
                                    : [];
                            const mainImage =
                                images.length > 0
                                    ? `/storage/${images[0]}`
                                    : "https://placehold.co/400x400?text=No+Image";

                            return (
                                <div
                                    key={product.id}
                                    className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                                >
                                    <div className="relative aspect-square overflow-hidden">
                                        <img
                                            src={mainImage}
                                            alt={product.name}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                            onError={(e) => {
                                                (
                                                    e.target as HTMLImageElement
                                                ).src =
                                                    "https://placehold.co/400x400?text=Image+Error";
                                            }}
                                        />
                                        {/* Overlay Actions */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                            <button
                                                onClick={() =>
                                                    handleOpenDetail(product)
                                                }
                                                className="p-3 bg-white text-[#2A1E12] rounded-full hover:bg-[#B46B30] hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 cursor-pointer"
                                                title="Lihat Detail"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    onAddToCart(product, 1)
                                                }
                                                className="p-3 bg-white text-[#2A1E12] rounded-full hover:bg-[#B46B30] hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75 cursor-pointer"
                                                title="Tambah ke Keranjang"
                                            >
                                                <ShoppingCart className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <div className="text-sm text-[#B46B30] font-medium mb-1">
                                            {product.category?.name}
                                        </div>
                                        <h3 className="text-lg font-bold text-[#2A1E12] mb-2 line-clamp-1">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xl font-bold text-[#784421]">
                                                {floatToIdCurrency(
                                                    product.price,
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <ProductDetail
                product={selectedProduct}
                isOpen={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
                onAddToCart={onAddToCart}
            />
        </section>
    );
}
