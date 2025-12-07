import { AppSetting } from "@/types/app_setting";
import { SelectOption } from "@/types/global";

interface FooterProps {
    appSetting: AppSetting;
    categories: SelectOption[];
}

export default function Footer({ appSetting, categories }: FooterProps) {
    return (
        <footer className="bg-[#2A1E12] text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <img
                                src="/assets/img/landing/logo.jpg"
                                alt="Nasywa Cake & Bakery Logo"
                                className="w-10 h-10 rounded-full object-cover shadow-sm"
                            />
                            <span className="text-xl font-bold">
                                Nasywa Cake & Bakery
                            </span>
                        </div>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Menyajikan kehangatan dan kebahagiaan melalui roti
                            dan kue berkualitas premium sejak 2010.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-[#B46B30]">
                            Navigasi
                        </h4>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="#home"
                                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                                >
                                    Beranda
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#about"
                                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                                >
                                    Tentang Kami
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#products"
                                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                                >
                                    Produk
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#custom-order"
                                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                                >
                                    Kustom Pesanan
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#contact"
                                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                                >
                                    Kontak
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Products */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-[#B46B30]">
                            Produk Populer
                        </h4>
                        <ul className="space-y-4">
                            {categories.length > 0 &&
                                categories.map((cat) => (
                                    <li key={cat.value}>
                                        <a
                                            href="#products"
                                            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                                        >
                                            {cat.label}
                                        </a>
                                    </li>
                                ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-[#D4A373]">
                            Hubungi Kami
                        </h4>
                        <ul className="space-y-4 text-gray-400">
                            <li>
                                RT.03/RW.03, Kesambi, Mejobo, Kudus, Jawa Tengah
                            </li>
                            <li>
                                {appSetting?.whatsapp_number ||
                                    "Nomor belum diatur"}
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    <p>
                        &copy; {new Date().getFullYear()} Nasywa Cake & Bakery.
                        Semua hak cipta dilindungi undang-undang.
                    </p>
                </div>
            </div>
        </footer>
    );
}
