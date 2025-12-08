import { Testimonial as TestimonialType } from "@/types/testimonial";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Stars } from "lucide-react";
import Marquee from "react-fast-marquee";

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
        <section
            id="testimonial"
            className="py-20 bg-[#FFFCF7] overflow-hidden"
        >
            <div className="container mx-auto px-4 text-center mb-12">
                <span className="text-[#B46B30] font-semibold tracking-wider uppercase">
                    Testimoni
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#2A1E12] mt-2">
                    Kata Mereka Tentang{" "}
                    <span className="text-[#B46B30]">Kami</span>
                </h2>
            </div>

            {testimonials.length === 0 ? (
                <div className="text-center py-16">
                    <div className="mb-6">
                        <Stars className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#2A1E12] mb-2">
                        Belum Ada Testimoni
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                        Testimoni pelanggan sedang dalam proses pengumpulan.
                        Silakan kembali lagi nanti untuk melihat ulasan dari
                        pelanggan kami.
                    </p>
                </div>
            ) : (
                <Marquee
                    speed={50}
                    gradient={true}
                    gradientColor="#FFFCF7"
                    gradientWidth={80}
                    pauseOnHover={true}
                >
                    {displayTestimonials.map((item, index) => (
                        <div
                            key={`${item.id}-${index}`}
                            className="w-[300px] md:w-[400px] h-[200px] bg-white p-6 rounded-2xl shadow-sm border border-gray-100 shrink-0 mx-3 flex flex-col"
                        >
                            <div className="flex items-center gap-1 mb-4">
                                <Rating
                                    style={{ maxWidth: 100 }}
                                    value={item.rating}
                                    readOnly
                                />
                            </div>
                            <p className="text-gray-600 italic mb-6 line-clamp-3 flex-1">
                                "{item.comment}"
                            </p>
                            <div className="flex items-center gap-3 mt-auto">
                                <div className="w-10 h-10 bg-[#E8B888] rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    {item.customer_name.charAt(0)}
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold text-[#2A1E12]">
                                        {item.customer_name}
                                    </p>
                                    <span className="text-xs text-gray-500">
                                        Pelanggan Kami
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </Marquee>
            )}
        </section>
    );
}
