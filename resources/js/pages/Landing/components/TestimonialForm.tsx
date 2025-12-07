import { useForm } from "@inertiajs/react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useState } from "react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

export default function TestimonialForm() {
    const { data, setData, post, processing, reset } = useForm({
        customer_name: "",
        rating: 5,
        comment: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/testimonial", {
            onSuccess: () => {
                toast.success("Terima kasih atas ulasan Anda!");
                reset();
            },
            onError: () => {
                toast.error("Gagal mengirim ulasan.");
            },
        });
    };

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-2xl">
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-[#2A1E12]">
                        Bagikan Pengalaman Anda
                    </h3>
                    <p className="text-gray-600">
                        Pendapat Anda sangat berarti bagi kami.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-[#FFFCF7] p-8 rounded-2xl shadow-lg border border-[#B46B30]/20"
                >
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-[#2A1E12] mb-2">
                            Rating
                        </label>
                        <div className="flex gap-2">
                            <Rating
                                value={data.rating}
                                onChange={(value: number) =>
                                    setData("rating", value)
                                }
                                style={{ maxWidth: 150 }}
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="customer_name"
                            className="block text-sm font-medium text-[#2A1E12] mb-2"
                        >
                            Nama Lengkap
                        </label>
                        <input
                            type="text"
                            id="customer_name"
                            value={data.customer_name}
                            onChange={(e) =>
                                setData("customer_name", e.target.value)
                            }
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#B46B30] focus:ring focus:ring-[#B46B30]/20 outline-none transition-all"
                            placeholder="Masukkan nama Anda"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="comment"
                            className="block text-sm font-medium text-[#2A1E12] mb-2"
                        >
                            Ulasan
                        </label>
                        <textarea
                            id="comment"
                            value={data.comment}
                            onChange={(e) => setData("comment", e.target.value)}
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#B46B30] focus:ring focus:ring-[#B46B30]/20 outline-none transition-all resize-none"
                            placeholder="Ceritakan pengalaman Anda..."
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-4 bg-[#B46B30] hover:bg-[#784421] text-white font-bold rounded-xl transition-colors disabled:opacity-70 cursor-pointer"
                    >
                        {processing ? "Mengirim..." : "Kirim Ulasan"}
                    </button>
                </form>
            </div>
        </section>
    );
}
