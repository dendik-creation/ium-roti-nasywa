import { CheckCircle2 } from "lucide-react";

export default function About() {
    const highlights = [
        "Fresh Ingredients",
        "Handmade with Love",
        "Hygienic Process",
        "Premium Quality",
    ];

    return (
        <section id="about" className="py-20 bg-[#FFFCF7]">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image Side */}
                    <div className="relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                            <img
                                src="/assets/img/landing/about_section.jpg"
                                alt="Tentang Nasywa Cake & Bakery"
                                className="w-full h-[500px] object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#D4A373] rounded-full -z-10 opacity-50 blur-2xl" />
                        <div className="absolute -top-6 -left-6 w-48 h-48 bg-[#B46B30] rounded-full -z-10 opacity-50 blur-2xl" />
                    </div>

                    {/* Content Side */}
                    <div className="space-y-6">
                        <span className="text-[#B46B30] font-semibold tracking-wider uppercase">
                            Tentang Kami
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#2A1E12]">
                            Kisah Manis <br />
                            <span className="text-[#B46B30]">
                                Nasywa Cake & Bakery
                            </span>
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Bermula di tahun 2005, Bu Andri memulai perjalanan
                            rasanya dari hobi membuat roti secara otodidak di
                            Kudus. Dari sekadar membagikan 1/2 kg adonan kepada
                            tetangga, respon hangat tumbuh menjadi pesanan yang
                            terus mengalir hingga kini.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Pada 2010, lahirlah nama{" "}
                            <strong>Nasywa Cake & Bakery</strong>, terinspirasi
                            dari putri tercinta. "Nasywa" berarti
                            kebahagiaan—filosofi yang kami pegang untuk selalu
                            menghadapi segala kondisi dengan gembira dan
                            menyajikan kebahagiaan itu kepada Anda.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                            {highlights.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3"
                                >
                                    <CheckCircle2 className="w-5 h-5 text-[#B46B30]" />
                                    <span className="text-[#2A1E12] font-medium">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
