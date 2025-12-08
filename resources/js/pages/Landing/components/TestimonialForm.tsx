import { useForm } from "@inertiajs/react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
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
        <section className="py-20 bg-[#FFFCF7]">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                    {/* Image Side */}
                    <div className="w-full md:w-1/2 relative min-h-[300px]">
                        <img
                            src="/assets/img/landing/custom_form_section.jpg"
                            alt="Customer Review"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#000000]/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8 text-white">
                            <h3 className="text-3xl font-bold mb-2">
                                Bagikan Pengalaman Anda
                            </h3>
                            <p className="text-white/90">
                                Pendapat Anda sangat berarti bagi kami untuk
                                terus berkembang.
                            </p>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="w-full md:w-1/2 p-8 md:p-12">
                        <h2 className="text-2xl font-bold text-[#2A1E12] mb-6">
                            Form Ulasan
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-[#2A1E12] mb-1">
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
                            <div>
                                <label className="block text-sm font-medium text-[#2A1E12] mb-1">
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.customer_name}
                                    onChange={(e) =>
                                        setData("customer_name", e.target.value)
                                    }
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#B46B30] focus:ring focus:ring-[#B46B30]/20 outline-none transition-all"
                                    placeholder="Masukkan nama Anda"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#2A1E12] mb-1">
                                    Ulasan
                                </label>
                                <textarea
                                    required
                                    value={data.comment}
                                    onChange={(e) =>
                                        setData("comment", e.target.value)
                                    }
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#B46B30] focus:ring focus:ring-[#B46B30]/20 outline-none transition-all resize-none"
                                    placeholder="Ceritakan pengalaman Anda..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-3 bg-[#B46B30] hover:bg-[#784421] text-white font-bold rounded-xl transition-colors disabled:opacity-70 cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                {processing ? "Mengirim..." : "Kirim Ulasan"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
