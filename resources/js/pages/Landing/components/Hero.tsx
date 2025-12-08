import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section
            id="home"
            className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
        >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/assets/img/landing/hero_section.jpg"
                    alt="Bakery Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center text-white">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
                    Setiap Gigitan, <br />
                    <span className="text-[#D4A373]">Cerita Manis Nasywa.</span>
                </h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-200">
                    Dari dapur kami ke meja Anda, selalu ada manis yang bisa
                    dibagikan. Nikmati kelembutan roti dan kue premium buatan
                    tangan dengan bahan terbaik.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="#products"
                        className="px-8 py-4 bg-[#B46B30] hover:bg-[#784421] text-white rounded-full font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
                    >
                        Pesan Sekarang
                        <ArrowRight className="w-5 h-5" />
                    </a>
                    <a
                        href="#about"
                        className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full font-semibold transition-all cursor-pointer"
                    >
                        Pelajari Lebih Lanjut
                    </a>
                </div>
            </div>
        </section>
    );
}
