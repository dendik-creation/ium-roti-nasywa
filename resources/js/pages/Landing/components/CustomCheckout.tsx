import { useState } from "react";
import { AppSetting } from "@/types/app_setting";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomCheckoutProps {
    appSetting: AppSetting;
}

export default function CustomCheckout({ appSetting }: CustomCheckoutProps) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        description: "",
        date: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const message =
            `Halo Nasywa Cake & Bakery, saya ingin memesan custom:%0A%0A` +
            `Nama: ${formData.name}%0A` +
            `No. HP: ${formData.phone}%0A` +
            `Tanggal Diperlukan: ${formData.date}%0A` +
            `Detail Pesanan: ${formData.description}`;

        const phoneNumber = appSetting?.whatsapp_number || "6281234567890";
        const formattedPhone = phoneNumber
            .replace(/^0/, "62")
            .replace(/\D/g, "");

        window.open(
            `https://wa.me/${formattedPhone}?text=${message}`,
            "_blank"
        );
    };

    return (
        <section id="custom-order" className="py-20 bg-[#FFFCF7]">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                    {/* Image Side */}
                    <div className="w-full md:w-1/2 relative min-h-[300px]">
                        <img
                            src="/assets/img/landing/custom_form_section.jpg"
                            alt="Custom Cake"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#000000]/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8 text-white">
                            <h3 className="text-3xl font-bold mb-2">
                                Punya Ide Kue Impian?
                            </h3>
                            <p className="text-white/90">
                                Wujudkan kue spesial untuk momen berhargamu
                                bersama kami.
                            </p>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="w-full md:w-1/2 p-8 md:p-12">
                        <h2 className="text-2xl font-bold text-[#2A1E12] mb-6">
                            Form Pesanan Custom
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-[#2A1E12] mb-1">
                                    Nama Lengkap
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
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#B46B30] focus:ring focus:ring-[#B46B30]/20 outline-none transition-all"
                                    placeholder="Nama Anda"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#2A1E12] mb-1">
                                    Nomor WhatsApp
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
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#B46B30] focus:ring focus:ring-[#B46B30]/20 outline-none transition-all"
                                    placeholder="0812xxxx"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#2A1E12] mb-1">
                                    Tanggal Diperlukan
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            date: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#B46B30] focus:ring focus:ring-[#B46B30]/20 outline-none transition-all cursor-pointer"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#2A1E12] mb-1">
                                    Detail Pesanan
                                </label>
                                <textarea
                                    required
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value,
                                        })
                                    }
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#B46B30] focus:ring focus:ring-[#B46B30]/20 outline-none transition-all resize-none"
                                    placeholder="Jelaskan desain, rasa, atau tema yang Anda inginkan..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-[#B46B30] hover:bg-[#784421] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <Send className="w-5 h-5" />
                                Kirim Pesanan Custom
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
