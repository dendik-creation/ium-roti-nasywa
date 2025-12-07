import { Testimonial as TestimonialType } from "@/types/testimonial";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { cn } from "@/lib/utils";

interface TestimonialProps {
    testimonials: TestimonialType[];
}

export default function Testimonial({ testimonials }: TestimonialProps) {
    // Duplicate testimonials to create seamless loop if needed
    const displayTestimonials =
        testimonials.length > 0
            ? [...testimonials, ...testimonials, ...testimonials]
            : [];

    return (
        <section className="py-20 bg-[#FFFCF7] overflow-hidden">
            <div className="container mx-auto px-4 text-center mb-12">
                <span className="text-[#B46B30] font-semibold tracking-wider uppercase">
                    Testimoni
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#2A1E12] mt-2">
                    Kata Mereka Tentang{" "}
                    <span className="text-[#B46B30]">Kami</span>
                </h2>
            </div>

            <div className="relative w-full">
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-[#FFFCF7] to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-[#FFFCF7] to-transparent z-10" />

                <div className="flex gap-6 animate-scroll w-max hover:pause">
                    {displayTestimonials.map((item, index) => (
                        <div
                            key={`${item.id}-${index}`}
                            className="w-[300px] md:w-[400px] bg-white p-6 rounded-2xl shadow-sm border border-gray-100 shrink-0"
                        >
                            <div className="flex items-center gap-1 mb-4">
                                <Rating
                                    style={{ maxWidth: 100 }}
                                    value={item.rating}
                                    readOnly
                                />
                            </div>
                            <p className="text-gray-600 italic mb-6 line-clamp-3">
                                "{item.comment}"
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#E8B888] rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    {item.customer_name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#2A1E12]">
                                        {item.customer_name}
                                    </h4>
                                    <span className="text-xs text-gray-500">
                                        Pelanggan Setia
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }
                .hover\\:pause:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
}
