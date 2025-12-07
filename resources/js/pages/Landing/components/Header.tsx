import { useState, useEffect } from "react";
import { Menu, ShoppingCart, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
    onCartClick: () => void;
    cartItemCount: number;
    is_logged_in: boolean;
}

export default function Header({
    onCartClick,
    cartItemCount,
    is_logged_in,
}: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Beranda", href: "#home" },
        { name: "Tentang", href: "#about" },
        { name: "Produk", href: "#products" },
        { name: "Pesanan Kustom", href: "#custom-order" },
        { name: "Kontak", href: "#contact" },
    ];

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    isScrolled
                        ? "bg-white/95 backdrop-blur-sm shadow-md py-4 text-[#2A1E12]"
                        : "bg-transparent py-4 md:py-6 text-white"
                )}
            >
                <div className="container mx-auto px-4 flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer">
                        <img
                            src="/assets/img/landing/logo.jpg"
                            alt="Nasywa Cake & Bakery Logo"
                            className="w-10 h-10 rounded-full object-cover shadow-sm"
                        />
                        <span
                            className={cn(
                                "text-xl font-bold tracking-tight",
                                isScrolled ? "text-[#B46B30]" : "text-white"
                            )}
                        >
                            Nasywa Cake & Bakery
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="hover:text-[#E8B888] transition-colors font-medium cursor-pointer text-sm tracking-wide"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onCartClick}
                            className="relative p-2 hover:bg-black/10 rounded-full transition-colors cursor-pointer"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#B46B30] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                                    {cartItemCount}
                                </span>
                            )}
                        </button>

                        {/* Auth Button Desktop */}
                        <div className="hidden md:block">
                            {is_logged_in ? (
                                <a
                                    href="/admin/dashboard"
                                    className="px-5 py-2 bg-[#B46B30] hover:bg-[#784421] text-white rounded-full font-semibold transition-all text-sm cursor-pointer"
                                >
                                    Dashboard
                                </a>
                            ) : (
                                <a
                                    href="/auth/signin"
                                    className={cn(
                                        "px-5 py-2 rounded-full font-semibold transition-all text-sm border cursor-pointer",
                                        isScrolled
                                            ? "border-[#B46B30] text-[#B46B30] hover:bg-[#B46B30] hover:text-white"
                                            : "border-white text-white hover:bg-white hover:text-[#B46B30]"
                                    )}
                                >
                                    Masuk
                                </a>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 cursor-pointer"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Sidebar */}
            <div
                className={cn(
                    "fixed inset-0 z-60 bg-black/50 transition-opacity md:hidden",
                    isMobileMenuOpen
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
            >
                <div
                    className={cn(
                        "absolute top-0 left-0 bottom-0 w-[80%] max-w-xs bg-[#FFFCF7] p-6 transition-transform duration-300 shadow-2xl",
                        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    )}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-8 border-b border-[#B46B30]/10 pb-4">
                        <span className="text-xl font-bold text-[#B46B30]">
                            Menu
                        </span>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="cursor-pointer p-1 hover:bg-[#B46B30]/10 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6 text-[#784421]" />
                        </button>
                    </div>
                    <nav className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-lg font-medium text-[#2A1E12] hover:text-[#B46B30] cursor-pointer py-2 border-b border-dashed border-gray-200"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}

                        {/* Auth Button Mobile */}
                        <div className="pt-4">
                            {is_logged_in ? (
                                <a
                                    href="/admin/dashboard"
                                    className="block w-full text-center px-5 py-3 bg-[#B46B30] hover:bg-[#784421] text-white rounded-xl font-bold transition-all cursor-pointer"
                                >
                                    Dashboard
                                </a>
                            ) : (
                                <a
                                    href="/auth/signin"
                                    className="block w-full text-center px-5 py-3 border-2 border-[#B46B30] text-[#B46B30] hover:bg-[#B46B30] hover:text-white rounded-xl font-bold transition-all cursor-pointer"
                                >
                                    Masuk
                                </a>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}
