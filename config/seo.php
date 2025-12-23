<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Default SEO Meta Tags
    |--------------------------------------------------------------------------
    |
    | These are the default SEO meta tags that will be used throughout
    | the application. You can override these in specific pages.
    |
    */

    "defaults" => [
        "title" => "Nasywa Cake & Bakery - Tempat Cinta Roti & Kue Terbaik",
        "title_separator" => " - ",
        "title_suffix" => "Nasywa Cake & Bakery",
        "description" =>
            "Nasywa Cake & Bakery menyediakan roti dan kue berkualitas tinggi dengan rasa autentik. Pesan sekarang untuk pengalaman kuliner terbaik! Tersedia berbagai macam roti, kue ulang tahun, pastry, dan produk bakery lainnya.",
        "keywords" =>
            "roti, kue, bakery, nasywa, cake, roti manis, kue ulang tahun, pastry, kue tart, roti tawar, donat, croissant, muffin, cupcake, jakarta, bogor, depok, tangerang, bekasi, toko roti, bakery terdekat",
        "author" => "Nasywa Cake & Bakery",
        "robots" =>
            "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        "canonical" => null, // Will use current URL if null
        "image" => "assets/img/landing/logo.png",
    ],

    /*
    |--------------------------------------------------------------------------
    | Open Graph Settings
    |--------------------------------------------------------------------------
    |
    | Default Open Graph meta tags for social media sharing.
    |
    */

    "og" => [
        "site_name" => "Nasywa Cake & Bakery",
        "type" => "website",
        "locale" => "id_ID",
        "image_width" => 1200,
        "image_height" => 630,
    ],

    /*
    |--------------------------------------------------------------------------
    | Twitter Card Settings
    |--------------------------------------------------------------------------
    |
    | Default Twitter Card meta tags.
    |
    */

    "twitter" => [
        "card" => "summary_large_image",
        "site" => "@NasywaCakeBakery", // Add your Twitter handle if available
    ],

    /*
    |--------------------------------------------------------------------------
    | JSON-LD Structured Data
    |--------------------------------------------------------------------------
    |
    | Default structured data configuration.
    |
    */

    "json_ld" => [
        "organization" => [
            "@type" => "LocalBusiness",
            "name" => "Nasywa Cake & Bakery",
            "description" =>
                "Bakery dan cake shop terbaik dengan produk berkualitas tinggi, menyediakan roti segar, kue ulang tahun, pastry, dan berbagai produk bakery lainnya.",
            "url" => null, // Will be set dynamically
            "logo" => "assets/img/landing/logo.png",
            "image" => "assets/img/landing/hero_section.jpg",
            "priceRange" => '$$',
            "servesCuisine" => ["Bakery", "Pastry", "Dessert", "Bread"],
            "foundingDate" => "2020",
            "openingHours" => ["Mo-Su 08:00-20:00"],
            "paymentAccepted" => [
                "Cash",
                "Credit Card",
                "Bank Transfer",
                "E-Wallet",
            ],
            "currenciesAccepted" => "IDR",
            "areaServed" => [
                "Jakarta",
                "Bogor",
                "Depok",
                "Tangerang",
                "Bekasi",
            ],
        ],

        "website" => [
            "@type" => "WebSite",
            "name" => "Nasywa Cake & Bakery",
            "alternateName" => "Nasywa Bakery",
            "url" => null, // Will be set dynamically
            "potentialAction" => [
                "@type" => "SearchAction",
                "target" => "/?search={search_term_string}",
                "query-input" => "required name=search_term_string",
            ],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Bot Detection Settings
    |--------------------------------------------------------------------------
    |
    | Configure bot detection patterns and behavior.
    |
    */

    "bot_detection" => [
        "enabled" => true,
        "patterns" => [
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
            "instagram",
            "pinterest",
            "reddit",
            "discordbot",
            "vkshare",
            "skypeuripreview",
        ],
        "serve_static_html" => true,
        "cache_static_html" => true,
        "cache_duration" => 3600, // 1 hour in seconds
    ],

    /*
    |--------------------------------------------------------------------------
    | Sitemap Configuration
    |--------------------------------------------------------------------------
    |
    | Configure sitemap generation settings.
    |
    */

    "sitemap" => [
        "enabled" => true,
        "cache_duration" => 86400, // 24 hours in seconds
        "sections" => [
            "home" => [
                "priority" => 1.0,
                "changefreq" => "weekly",
            ],
            "about" => [
                "priority" => 0.8,
                "changefreq" => "monthly",
            ],
            "products" => [
                "priority" => 0.9,
                "changefreq" => "weekly",
            ],
            "testimonial" => [
                "priority" => 0.7,
                "changefreq" => "monthly",
            ],
            "contact" => [
                "priority" => 0.8,
                "changefreq" => "monthly",
            ],
        ],
        "include_products" => true,
        "include_categories" => true,
        "max_products" => 1000,
        "max_categories" => 100,
    ],

    /*
    |--------------------------------------------------------------------------
    | Performance Settings
    |--------------------------------------------------------------------------
    |
    | Configure performance-related SEO settings.
    |
    */

    "performance" => [
        "preload_fonts" => true,
        "dns_prefetch" => ["fonts.googleapis.com", "fonts.gstatic.com"],
        "preconnect" => [
            "https://fonts.googleapis.com",
            "https://fonts.gstatic.com",
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Theme and Brand Settings
    |--------------------------------------------------------------------------
    |
    | Configure theme colors and brand settings for meta tags.
    |
    */

    "theme" => [
        "color" => "#B46B30",
        "background_color" => "#FFFCF7",
        "accent_color" => "#E8B888",
    ],

    /*
    |--------------------------------------------------------------------------
    | Rich Snippets Settings
    |--------------------------------------------------------------------------
    |
    | Configure rich snippets for different content types.
    |
    */

    "rich_snippets" => [
        "enable_faq" => true,
        "enable_breadcrumbs" => true,
        "enable_reviews" => true,
        "enable_products" => true,
        "enable_recipes" => false, // Set to true if you have recipe content
    ],
];
