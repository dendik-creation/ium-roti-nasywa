import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"; // Assuming shadcn or I'll use Headless UI / Custom
import { Product } from "@/types/product";
import { X, Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { floatToIdCurrency } from "@/components/helper/helper";

// Fallback if shadcn dialog is not available, I will implement a custom modal in the component itself or use a simple fixed div overlay.
// Given the package.json has @radix-ui/react-dialog, I can probably use it if the components are set up.
// But to be safe and avoid missing component imports, I'll build a custom modal overlay here.

interface ProductDetailProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
    onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductDetail({
    product,
    isOpen,
    onClose,
    onAddToCart,
}: ProductDetailProps) {
    const [quantity, setQuantity] = useState(1);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    if (!isOpen || !product) return null;

    const images =
        product.images && product.images.length > 0
            ? product.images
            : ["https://placehold.co/600x400?text=No+Image"];

    const handleAddToCart = () => {
        onAddToCart(product, quantity);
        setQuantity(1);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                >
                    <X className="w-6 h-6 text-gray-500" />
                </button>

                {/* Image Section */}
                <div className="w-full md:w-1/2 bg-gray-100 p-4 flex flex-col gap-4">
                    <div className="aspect-square rounded-xl overflow-hidden bg-white">
                        <img
                            src={`/storage/${images[activeImageIndex]}`}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                    "https://placehold.co/600x400?text=Image+Error";
                            }}
                        />
                    </div>
                    {images.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImageIndex(idx)}
                                    className={cn(
                                        "w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all",
                                        activeImageIndex === idx
                                            ? "border-[#9B5C27]"
                                            : "border-transparent hover:border-gray-300"
                                    )}
                                >
                                    <img
                                        src={`/storage/${img}`}
                                        alt={`${product.name} ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Info Section */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
                    <div className="mb-auto">
                        <span className="inline-block px-3 py-1 bg-[#FFF8F0] text-[#9B5C27] text-sm font-medium rounded-full mb-4">
                            {product.category?.name || "Uncategorized"}
                        </span>
                        <h2 className="text-3xl font-bold text-[#2A1E12] mb-2">
                            {product.name}
                        </h2>
                        <p className="text-2xl font-bold text-[#9B5C27] mb-6">
                            {floatToIdCurrency(product.price)}
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            {product.description ||
                                "Deskripsi produk belum tersedia."}
                        </p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <span className="font-medium text-[#2A1E12]">
                                Jumlah
                            </span>
                            <div className="flex items-center gap-3 bg-gray-50 rounded-full p-1">
                                <button
                                    onClick={() =>
                                        setQuantity(Math.max(1, quantity - 1))
                                    }
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 hover:text-[#9B5C27] transition-colors"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center font-medium">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 hover:text-[#9B5C27] transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="w-full py-4 bg-[#9B5C27] hover:bg-[#59371B] text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            Tambah ke Keranjang - Rp{" "}
                            {(product.price * quantity).toLocaleString("id-ID")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
