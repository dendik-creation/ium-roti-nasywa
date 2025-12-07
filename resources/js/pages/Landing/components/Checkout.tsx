import { useState } from "react";
import { CartItem } from "./Cart";
import { AppSetting } from "@/types/app_setting";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { floatToIdCurrency } from "@/components/helper/helper";

interface CheckoutProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
    appSetting: AppSetting;
    onClearCart: () => void;
}

export default function Checkout({
    isOpen,
    onClose,
    cartItems,
    appSetting,
    onClearCart,
}: CheckoutProps) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        notes: "",
    });

    if (!isOpen) return null;

    const total = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    const handleWhatsAppOrder = () => {
        const itemsList = cartItems
            .map(
                (item) =>
                    `- ${item.product.name} x${item.quantity} (Rp ${(
                        item.product.price * item.quantity
                    ).toLocaleString("id-ID")})`
            )
            .join("\n");

        const message =
            `Halo Kak Admin Nasywa Cake & Bakery! 👋\n\n` +
            `Saya ingin memesan beberapa roti/kue enak dari Nasywa. Berikut daftar pesanan saya:\n\n` +
            `${itemsList}\n\n` +
            `💰 Total Pesanan: Rp ${total.toLocaleString("id-ID")}\n\n` +
            `Mohon dibantu proses ya Kak. Ini data pengiriman saya:\n` +
            `👤 Nama: ${formData.name}\n` +
            `📱 No. HP: ${formData.phone}\n` +
            `📍 Alamat: ${formData.address}\n` +
            `📝 Catatan: ${formData.notes || "-"}\n\n` +
            `Terima kasih! Ditunggu konfirmasinya ya Kak 🙏`;

        const phoneNumber = appSetting?.whatsapp_number || "6281234567890"; // Fallback
        // Ensure phone number format is correct for WA link (remove leading 0 or +, add 62)
        // Assuming appSetting.phone is stored cleanly or I should format it.
        // Simple formatter:
        const formattedPhone = phoneNumber
            .replace(/^0/, "62")
            .replace(/\D/g, "");

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodedMessage}&type=phone_number&app_absent=0`;

        window.open(whatsappUrl, "_blank");
        onClearCart();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-90 flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
                <div className="p-6 bg-[#B46B30] text-white flex items-center justify-between sticky top-0 z-10">
                    <h2 className="text-xl font-bold">
                        Selesaikan Pesanan via WhatsApp
                    </h2>
                    <button
                        onClick={onClose}
                        className="hover:bg-white/20 p-1 rounded-full transition-colors cursor-pointer"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="bg-[#FFFCF7] p-4 rounded-xl border border-[#D4A373]/30">
                        <p className="text-sm text-gray-600 mb-2">
                            Detail kebutuhan pesanan Anda dapat dilanjutkan pada
                            WhatsApp
                        </p>
                        <div className="font-bold text-[#2A1E12] flex justify-between items-center pt-2 border-t border-[#D4A373]/20">
                            <span>Total Pembayaran:</span>
                            <span className="text-[#B46B30] text-lg">
                                {floatToIdCurrency(total)}
                            </span>
                        </div>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleWhatsAppOrder();
                        }}
                    >
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#2A1E12] mb-1">
                                    Nama Lengkap{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#B46B30] focus:ring focus:ring-[#B46B30]/20 outline-none"
                                    placeholder="Nama Anda"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#2A1E12] mb-1">
                                    Nomor Telepon (WhatsApp){" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            phone: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#B46B30] focus:ring focus:ring-[#B46B30]/20 outline-none"
                                    placeholder="0812xxxx"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#2A1E12] mb-1">
                                    Alamat Lengkap{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    required
                                    value={formData.address}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            address: e.target.value,
                                        })
                                    }
                                    rows={3}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#B46B30] focus:ring focus:ring-[#B46B30]/20 outline-none resize-none"
                                    placeholder="Alamat pengiriman (jalan, kota, kode pos)"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#2A1E12] mb-1">
                                    Catatan Tambahan
                                </label>
                                <textarea
                                    value={formData.notes}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            notes: e.target.value,
                                        })
                                    }
                                    rows={2}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#B46B30] focus:ring focus:ring-[#B46B30]/20 outline-none resize-none"
                                    placeholder="Contoh: Jangan terlalu manis, dikirim jam 3 sore"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-8 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-200 cursor-pointer"
                        >
                            Hubungi via WhatsApp
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
