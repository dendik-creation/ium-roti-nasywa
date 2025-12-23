import { useState } from "react";
import { Head } from "@inertiajs/react";
import { Toaster, toast } from "react-hot-toast";
import { AppSetting } from "@/types/app_setting";
import { SelectOption } from "@/types/global";
import { Product } from "@/types/product";
import { Testimonial as TestimonialType } from "@/types/testimonial";

// Components
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import ProductSection from "./components/Product";
import TestimonialSection from "./components/Testimonial";
import TestimonialForm from "./components/TestimonialForm";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import Cart, { CartItem } from "./components/Cart";
import Checkout from "./components/Checkout";
import CustomCheckout from "./components/CustomCheckout";

type SEOData = {
    title: string;
    description: string;
    keywords: string;
    canonical: string;
    og_title: string;
    og_description: string;
    og_image: string;
    og_url: string;
    twitter_card: string;
};

type LandingPageProps = {
    products: Product[];
    categories: SelectOption[];
    testimonials: TestimonialType[];
    app_setting: AppSetting;
    is_logged_in: boolean;
    seo?: SEOData;
    structured_data?: any;
};

const LandingPage = ({
    products,
    categories,
    testimonials,
    app_setting,
    is_logged_in,
    seo,
    structured_data,
}: LandingPageProps) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const handleAddToCart = (product: Product, quantity: number) => {
        setCartItems((prev) => {
            const existingItem = prev.find(
                (item) => item.product.id === product.id,
            );
            if (existingItem) {
                toast.success(
                    `Jumlah ${product.name} diperbarui di keranjang!`,
                );
                return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item,
                );
            }
            toast.success(`${product.name} ditambahkan ke keranjang!`);
            return [...prev, { product, quantity }];
        });
    };

    const handleUpdateQuantity = (productId: number, newQuantity: number) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.product.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item,
            ),
        );
    };

    const handleRemoveItem = (productId: number) => {
        setCartItems((prev) =>
            prev.filter((item) => item.product.id !== productId),
        );
        toast.success("Produk dihapus dari keranjang");
    };

    const handleCheckout = () => {
        setIsCartOpen(false);
        setIsCheckoutOpen(true);
    };

    const handleClearCart = () => {
        setCartItems([]);
    };

    const cartItemCount = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0,
    );

    return (
        <>
            <Head>
                {/* Basic Meta Tags */}
                <title>
                    {seo?.title ||
                        "Roti Nasywa - Toko Roti dan Kue Terbaik di Indonesia"}
                </title>
                <meta
                    name="description"
                    content={
                        seo?.description ||
                        "Roti Nasywa menyediakan roti dan kue berkualitas tinggi dengan rasa autentik."
                    }
                />
                <meta
                    name="keywords"
                    content={
                        seo?.keywords || "roti nasywa, roti, kue, bakery, cake"
                    }
                />
                <link
                    rel="canonical"
                    href={seo?.canonical || window.location.href}
                />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content={seo?.og_url || window.location.href}
                />
                <meta
                    property="og:title"
                    content={seo?.og_title || seo?.title || "Roti Nasywa"}
                />
                <meta
                    property="og:description"
                    content={
                        seo?.og_description ||
                        seo?.description ||
                        "Temukan koleksi roti dan kue terbaik di Roti Nasywa"
                    }
                />
                <meta
                    property="og:image"
                    content={seo?.og_image || "/assets/img/landing/logo.png"}
                />
                <meta property="og:site_name" content="Roti Nasywa" />
                <meta property="og:locale" content="id_ID" />

                {/* Twitter */}
                <meta
                    property="twitter:card"
                    content={seo?.twitter_card || "summary_large_image"}
                />
                <meta
                    property="twitter:url"
                    content={seo?.og_url || window.location.href}
                />
                <meta
                    property="twitter:title"
                    content={seo?.og_title || seo?.title || "Roti Nasywa"}
                />
                <meta
                    property="twitter:description"
                    content={
                        seo?.og_description ||
                        seo?.description ||
                        "Temukan koleksi roti dan kue terbaik di Roti Nasywa"
                    }
                />
                <meta
                    property="twitter:image"
                    content={seo?.og_image || "/assets/img/landing/logo.png"}
                />

                {/* Additional Meta Tags */}
                <meta
                    name="robots"
                    content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
                />
                <meta name="author" content="Roti Nasywa" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta name="theme-color" content="#B46B30" />

                {/* Favicon */}
                <link
                    rel="icon"
                    type="image/png"
                    href="/assets/img/landing/logo.png"
                />

                {/* Structured Data */}
                {structured_data && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify(structured_data),
                        }}
                    />
                )}
            </Head>

            <style
                dangerouslySetInnerHTML={{
                    __html: `* { scroll-behavior: smooth; }`,
                }}
            />

            <div className="font-sans text-[#2A1E12] bg-[#FFFCF7] min-h-screen selection:bg-[#B46B30] selection:text-white">
                <Header
                    onCartClick={() => setIsCartOpen(true)}
                    cartItemCount={cartItemCount}
                    is_logged_in={is_logged_in}
                />

                <main>
                    <section id="home">
                        <Hero />
                    </section>
                    <section id="about">
                        <About />
                    </section>
                    <section id="products">
                        <ProductSection
                            products={products}
                            categories={categories}
                            onAddToCart={handleAddToCart}
                        />
                    </section>
                    <CustomCheckout appSetting={app_setting} />
                    <section id="testimonial">
                        <TestimonialSection testimonials={testimonials} />
                        <TestimonialForm />
                    </section>
                    <section id="contact">
                        <ContactUs appSetting={app_setting} />
                    </section>
                </main>

                <Footer appSetting={app_setting} categories={categories} />

                <Cart
                    isOpen={isCartOpen}
                    onClose={() => setIsCartOpen(false)}
                    cartItems={cartItems}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemoveItem={handleRemoveItem}
                    onCheckout={handleCheckout}
                />

                <Checkout
                    isOpen={isCheckoutOpen}
                    onClose={() => setIsCheckoutOpen(false)}
                    cartItems={cartItems}
                    appSetting={app_setting}
                    onClearCart={handleClearCart}
                />

                <Toaster
                    position="top-center"
                    toastOptions={{
                        style: {
                            background: "#333",
                            color: "#fff",
                        },
                        success: {
                            iconTheme: {
                                primary: "#9B5C27",
                                secondary: "#fff",
                            },
                        },
                    }}
                />
            </div>
        </>
    );
};

export default LandingPage;
