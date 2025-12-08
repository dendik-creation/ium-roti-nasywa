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

type LandingPageProps = {
    products: Product[];
    categories: SelectOption[];
    testimonials: TestimonialType[];
    app_setting: AppSetting;
    is_logged_in: boolean;
};

const LandingPage = ({
    products,
    categories,
    testimonials,
    app_setting,
    is_logged_in,
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
            <style
                dangerouslySetInnerHTML={{
                    __html: `* { scroll-behavior: smooth; }`,
                }}
            />
            <Head title="Nasywa Cake & Bakery - Tempat Cinta Roti & Kue" />

            <div className="font-sans text-[#2A1E12] bg-[#FFFCF7] min-h-screen selection:bg-[#B46B30] selection:text-white">
                <Header
                    onCartClick={() => setIsCartOpen(true)}
                    cartItemCount={cartItemCount}
                    is_logged_in={is_logged_in}
                />

                <main>
                    <Hero />
                    <About />
                    <ProductSection
                        products={products}
                        categories={categories}
                        onAddToCart={handleAddToCart}
                    />
                    <CustomCheckout appSetting={app_setting} />
                    <TestimonialSection testimonials={testimonials} />
                    <TestimonialForm />
                    <ContactUs appSetting={app_setting} />
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
