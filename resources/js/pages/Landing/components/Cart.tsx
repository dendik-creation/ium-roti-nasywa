import { Product } from "@/types/product";
import { X, Trash2, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { floatToIdCurrency } from "@/components/helper/helper";

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
    onUpdateQuantity: (productId: number, newQuantity: number) => void;
    onRemoveItem: (productId: number) => void;
    onCheckout: () => void;
}

export default function Cart({
    isOpen,
    onClose,
    cartItems,
    onUpdateQuantity,
    onRemoveItem,
    onCheckout,
}: CartProps) {
    const total = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    return (
        <>
            {/* Overlay */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/50 z-70 transition-opacity duration-300",
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                )}
                onClick={onClose}
            />

            {/* Sidebar */}
            <div
                className={cn(
                    "fixed top-0 right-0 bottom-0 w-full md:w-[400px] bg-white z-80 shadow-2xl transform transition-transform duration-300 flex flex-col",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="p-6 bg-[#B46B30] text-white flex items-center justify-between">
                    <h2 className="text-xl font-bold">Keranjang Belanja</h2>
                    <button
                        onClick={onClose}
                        className="hover:bg-white/20 p-1 rounded-full transition-colors cursor-pointer"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                            <p>Keranjang Anda kosong</p>
                        </div>
                    ) : (
                        cartItems.map((item) => {
                            const images =
                                item.product.images &&
                                item.product.images.length > 0
                                    ? item.product.images
                                    : [];
                            const image =
                                images.length > 0
                                    ? `/storage/${images[0]}`
                                    : "https://placehold.co/100x100?text=No+Image";

                            return (
                                <div
                                    key={item.product.id}
                                    className="flex gap-4 bg-white p-3 rounded-xl border border-gray-100 shadow-sm"
                                >
                                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                                        <img
                                            src={image}
                                            alt={item.product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h4 className="font-bold text-[#2A1E12] line-clamp-1">
                                                {item.product.name}
                                            </h4>
                                            <p className="text-[#B46B30] font-medium">
                                                {floatToIdCurrency(
                                                    item.product.price
                                                )}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-2 bg-gray-50 rounded-full p-1">
                                                <button
                                                    onClick={() =>
                                                        onUpdateQuantity(
                                                            item.product.id,
                                                            Math.max(
                                                                1,
                                                                item.quantity -
                                                                    1
                                                            )
                                                        )
                                                    }
                                                    className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 hover:text-[#B46B30] cursor-pointer"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="text-sm font-medium w-6 text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        onUpdateQuantity(
                                                            item.product.id,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                    className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 hover:text-[#B46B30] cursor-pointer"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    onRemoveItem(
                                                        item.product.id
                                                    )
                                                }
                                                className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-lg font-bold text-[#2A1E12]">
                            Total:
                        </span>
                        <span className="text-xl font-bold text-[#B46B30]">
                            {floatToIdCurrency(total)}
                        </span>
                    </div>
                    <button
                        onClick={onCheckout}
                        disabled={cartItems.length === 0}
                        className="w-full py-4 bg-[#B46B30] hover:bg-[#784421] text-white font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        Lanjut ke Pemesanan
                    </button>
                </div>
            </div>
        </>
    );
}
