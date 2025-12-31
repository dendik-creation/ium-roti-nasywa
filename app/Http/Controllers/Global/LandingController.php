<?php

namespace App\Http\Controllers\Global;

use App\Http\Controllers\Controller;
use App\Models\AppSetting;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Testimoni;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Jenssegers\Agent\Agent;

class LandingController extends Controller
{
    public function index(Request $request)
    {
        $agent = new Agent();
        $isBot = $this->detectBot($request);

        $categories = ProductCategory::select("id", "name")
            ->get()
            ->map(function ($item) {
                return [
                    "value" => $item->id,
                    "label" => $item->name,
                ];
            });

        $app_setting = AppSetting::getSetting();

        $products = Product::with("category")
            ->orderBy("order_number", "asc")
            ->get()
            ->map(function ($item) {
                $item->images = json_decode($item->images, true) ?: [];
                return $item;
            });

        $testimonials = Testimoni::limit("5")->latest()->get();

        // SEO Data
        $seoData = [
            "title" => "Roti Nasywa - Toko Roti dan Kue Terbaik di Indonesia",
            "description" =>
                "Roti Nasywa menyediakan roti dan kue berkualitas tinggi dengan rasa autentik. Pesan sekarang untuk pengalaman kuliner terbaik! Tersedia berbagai macam roti segar, kue ulang tahun, pastry premium, dan produk bakery lainnya.",
            "keywords" =>
                "roti nasywa, roti, kue, bakery, cake, roti manis, kue ulang tahun, pastry, kue tart, roti tawar, donat, croissant, muffin, cupcake, toko roti",
            "canonical" => "https://rotinasywa.my.id/",
            "og_title" => "Roti Nasywa - Toko Roti dan Kue Terbaik",
            "og_description" =>
                "Temukan koleksi roti dan kue terbaik di Roti Nasywa. Fresh daily, kualitas premium dengan cita rasa yang tak terlupakan!",
            "og_image" =>
                "https://rotinasywa.my.id/assets/img/landing/logo.png",
            "og_url" => "https://rotinasywa.my.id/",
            "twitter_card" => "summary_large_image",
        ];

        // If it's a bot, return SEO-optimized static HTML
        if ($isBot) {
            return $this->renderBotView(
                $seoData,
                $products,
                $testimonials,
                $app_setting,
                $categories,
            );
        }

        // For regular users, return Inertia response
        return Inertia::render("Landing/Index", [
            "categories" => $categories,
            "products" => $products,
            "app_setting" => $app_setting,
            "testimonials" => $testimonials,
            "is_logged_in" => Auth::check(),
            "seo" => $seoData,
            "structured_data" => $this->getStructuredData(
                $app_setting,
                $products,
            ),
        ]);
    }

    private function detectBot(Request $request)
    {
        $userAgent = $request->header("User-Agent", "");

        $botPatterns = [
            "googlebot",
            "bingbot",
            "slurp",
            "duckduckbot",
            "baiduspider",
            "yandexbot",
            "facebookexternalhit",
            "twitterbot",
            "linkedinbot",
            "whatsapp",
            "telegrambot",
            "applebot",
            "crawler",
            "spider",
            "bot",
            "scraper",
            "facebook",
            "twitter",
            "linkedin",
        ];

        foreach ($botPatterns as $pattern) {
            if (stripos($userAgent, $pattern) !== false) {
                return true;
            }
        }

        return false;
    }

    private function renderBotView(
        $seoData,
        $products,
        $testimonials,
        $appSetting,
        $categories,
    ) {
        $structuredData = $this->getStructuredData($appSetting, $products);

        $html =
            '<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Basic SEO Meta Tags -->
    <title>' .
            $seoData["title"] .
            '</title>
    <meta name="description" content="' .
            $seoData["description"] .
            '">
    <meta name="keywords" content="' .
            $seoData["keywords"] .
            '">
    <meta name="author" content="Nasywa Cake & Bakery">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <link rel="canonical" href="' .
            $seoData["canonical"] .
            '">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="' .
            $seoData["og_url"] .
            '">
    <meta property="og:title" content="' .
            $seoData["og_title"] .
            '">
    <meta property="og:description" content="' .
            $seoData["og_description"] .
            '">
    <meta property="og:image" content="' .
            $seoData["og_image"] .
            '">
    <meta property="og:site_name" content="Nasywa Cake & Bakery">
    <meta property="og:locale" content="id_ID">

    <!-- Twitter -->
    <meta property="twitter:card" content="' .
            $seoData["twitter_card"] .
            '">
    <meta property="twitter:url" content="' .
            $seoData["og_url"] .
            '">
    <meta property="twitter:title" content="' .
            $seoData["og_title"] .
            '">
    <meta property="twitter:description" content="' .
            $seoData["og_description"] .
            '">
    <meta property="twitter:image" content="' .
            $seoData["og_image"] .
            '">

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="' .
            asset("assets/img/landing/logo.png") .
            '">

    <!-- Additional Meta Tags -->
    <meta name="theme-color" content="#B46B30">
    <meta name="msapplication-TileColor" content="#B46B30">

    <!-- Structured Data -->
    <script type="application/ld+json">
    ' .
            json_encode(
                $structuredData,
                JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE,
            ) .
            '
    </script>

    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #FFFCF7;
            color: #2A1E12;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .section {
            margin: 40px 0;
            padding: 20px;
        }
        h1, h2, h3 {
            color: #B46B30;
            margin-bottom: 15px;
        }
        .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        .product-card {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            background: white;
        }
        .testimonial {
            border-left: 4px solid #B46B30;
            padding: 15px;
            margin: 10px 0;
            background: white;
        }
        .contact-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header Section -->
        <header id="home" class="section">
            <h1>Nasywa Cake & Bakery - Tempat Cinta Roti & Kue</h1>
            <p>Selamat datang di Nasywa Cake & Bakery, destinasi terbaik untuk pengalaman kuliner roti dan kue yang tak terlupakan. Kami menghadirkan produk berkualitas tinggi dengan cita rasa autentik yang dibuat dengan penuh cinta dan dedikasi.</p>
        </header>

        <!-- About Section -->
        <section id="about" class="section">
            <h2>Tentang Kami</h2>
            <p>Nasywa Cake & Bakery adalah toko roti dan kue yang berdedikasi untuk menghadirkan produk bakery terbaik dengan kualitas premium. Kami menggunakan bahan-bahan pilihan dan resep tradisional yang telah teruji untuk menciptakan roti dan kue dengan rasa yang istimewa.</p>
            <p>Dengan pengalaman bertahun-tahun di industri bakery, kami memahami betul selera dan kebutuhan pelanggan. Setiap produk kami dibuat fresh daily dengan standar kebersihan dan kualitas yang tinggi.</p>
        </section>

        <!-- Products Section -->
        <section id="products" class="section">
            <h2>Produk Kami</h2>
            <p>Temukan beragam produk berkualitas tinggi dari Nasywa Cake & Bakery:</p>';

        // Add categories
        if ($categories->count() > 0) {
            $html .= "<h3>Kategori Produk:</h3><ul>";
            foreach ($categories as $category) {
                $html .=
                    "<li>" . htmlspecialchars($category["label"]) . "</li>";
            }
            $html .= "</ul>";
        }

        // Add products
        if ($products->count() > 0) {
            $html .= '<div class="product-grid">';
            foreach ($products->take(12) as $product) {
                $html .=
                    '<div class="product-card">
                    <h3>' .
                    htmlspecialchars($product->name) .
                    '</h3>
                    <p>' .
                    htmlspecialchars(
                        $product->description ??
                            "Produk berkualitas tinggi dari Nasywa Cake & Bakery",
                    ) .
                    '</p>
                    <p><strong>Kategori:</strong> ' .
                    htmlspecialchars($product->category->name ?? "General") .
                    '</p>
                    <p><strong>Harga:</strong> Rp ' .
                    number_format($product->price ?? 0, 0, ",", ".") .
                    '</p>
                </div>';
            }
            $html .= "</div>";
        }

        $html .= '</section>

        <!-- Testimonials Section -->
        <section id="testimonial" class="section">
            <h2>Testimoni Pelanggan</h2>
            <p>Dengarkan apa kata pelanggan kami tentang produk dan layanan Nasywa Cake & Bakery:</p>';

        if ($testimonials->count() > 0) {
            foreach ($testimonials as $testimonial) {
                $rating =
                    str_repeat("★", $testimonial->rating ?? 5) .
                    str_repeat("☆", 5 - ($testimonial->rating ?? 5));
                $html .=
                    '<div class="testimonial">
                    <h4>' .
                    htmlspecialchars($testimonial->customer_name) .
                    '</h4>
                    <p>Rating: ' .
                    $rating .
                    " (" .
                    ($testimonial->rating ?? 5) .
                    '/5)</p>
                    <p>"' .
                    htmlspecialchars($testimonial->comment) .
                    '"</p>
                </div>';
            }
        }

        $html .= '</section>

        <!-- Contact Section -->
        <section id="contact" class="section">
            <h2>Hubungi Kami</h2>
            <div class="contact-info">
                <h3>Informasi Kontak</h3>';

        if ($appSetting) {
            if ($appSetting->phone) {
                $html .=
                    '<p><strong>Telepon:</strong> <a href="tel:' .
                    $appSetting->phone .
                    '">' .
                    htmlspecialchars($appSetting->phone) .
                    "</a></p>";
            }
            if ($appSetting->email) {
                $html .=
                    '<p><strong>Email:</strong> <a href="mailto:' .
                    $appSetting->email .
                    '">' .
                    htmlspecialchars($appSetting->email) .
                    "</a></p>";
            }
            if ($appSetting->address) {
                $html .=
                    "<p><strong>Alamat:</strong> " .
                    htmlspecialchars($appSetting->address) .
                    "</p>";
            }
            if ($appSetting->whatsapp) {
                $html .=
                    "<p><strong>WhatsApp:</strong> <a href=\"https://wa.me/" .
                    $appSetting->whatsapp .
                    '">Chat WhatsApp Roti Nasywa</a></p>';
            }
        }

        $html .=
            '</div>
            <p>Kunjungi toko kami atau hubungi untuk pemesanan khusus. Kami siap melayani kebutuhan roti dan kue Anda dengan sepenuh hati!</p>
        </section>

        <!-- Footer -->
        <footer class="section">
            <p>&copy; ' .
            date("Y") .
            ' Roti Nasywa. Semua hak dilindungi. Dibuat dengan cinta untuk pengalaman kuliner terbaik Anda.</p>
            <p><a href="#home">Home</a> | <a href="#about">Tentang</a> | <a href="#products">Produk</a> | <a href="#testimonial">Testimoni</a> | <a href="#contact">Kontak</a></p>
        </footer>
    </div>

    <!-- Additional SEO Content -->
    <div style="display: none;">
        <p>nasywa cake bakery roti kue jakarta bogor depok tangerang bekasi</p>
        <p>toko roti terdekat bakery terbaik kue ulang tahun custom</p>
        <p>roti nasywa jakarta bogor depok tangerang bekasi</p>
        <p>toko roti terdekat bakery terbaik kue ulang tahun custom</p>
        <p>roti manis roti tawar donat croissant muffin cupcake</p>
        <p>pesan kue online delivery roti segar setiap hari</p>
    </div>
</body>
</html>';

        return response($html)->header("Content-Type", "text/html");
    }

    private function getStructuredData($appSetting, $products)
    {
        $structuredData = [
            "@context" => "https://schema.org",
            "@type" => "LocalBusiness",
            "name" => "Roti Nasywa",
            "description" =>
                "Bakery dan cake shop terbaik dengan produk berkualitas tinggi, menyediakan roti segar, kue ulang tahun, pastry, dan berbagai produk bakery lainnya.",
            "url" => "https://rotinasywa.my.id/",
            "logo" => "https://rotinasywa.my.id/assets/img/landing/logo.png",
            "image" =>
                "https://rotinasywa.my.id/assets/img/landing/hero_section.jpg",
            "priceRange" => "$$",
            "servesCuisine" => "Bakery, Pastry, Dessert",
            "foundingDate" => "2020",
        ];

        if ($appSetting) {
            if ($appSetting->phone) {
                $structuredData["telephone"] = $appSetting->phone;
            }
            if ($appSetting->email) {
                $structuredData["email"] = $appSetting->email;
            }
            if ($appSetting->address) {
                $structuredData["address"] = [
                    "@type" => "PostalAddress",
                    "streetAddress" => $appSetting->address,
                    "addressLocality" => "Jakarta",
                    "addressRegion" => "DKI Jakarta",
                    "addressCountry" => "ID",
                ];
            }
        }

        $structuredData["openingHours"] = ["Mo-Su 08:00-20:00"];

        // Add products as offers
        if ($products->count() > 0) {
            $offers = [];
            foreach ($products->take(10) as $product) {
                $offers[] = [
                    "@type" => "Offer",
                    "name" => $product->name,
                    "description" =>
                        $product->description ??
                        "Produk berkualitas dari Nasywa Cake & Bakery",
                    "price" => $product->price ?? 0,
                    "priceCurrency" => "IDR",
                    "availability" => "https://schema.org/InStock",
                    "category" => $product->category->name ?? "Bakery",
                ];
            }
            $structuredData["hasOfferCatalog"] = [
                "@type" => "OfferCatalog",
                "name" => "Katalog Produk Roti Nasywa",
                "itemListElement" => $offers,
            ];
        }

        return $structuredData;
    }

    public function storeTestimonial(Request $request)
    {
        $request->validate([
            "customer_name" => "required|string|max:255",
            "rating" => "required|integer|min:1|max:5",
            "comment" => "required|string",
        ]);

        Testimoni::create($request->all());

        return redirect()
            ->back()
            ->with("success", "Terima kasih atas ulasan Anda!");
    }
}
