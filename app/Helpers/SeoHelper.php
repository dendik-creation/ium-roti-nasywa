<?php

namespace App\Helpers;

class SeoHelper
{
    /**
     * Generate SEO data for a page
     *
     * @param array $options
     * @return array
     */
    public static function generateSeoData($options = [])
    {
        $defaults = [
            'title' => 'Nasywa Cake & Bakery - Tempat Cinta Roti & Kue Terbaik',
            'description' => 'Nasywa Cake & Bakery menyediakan roti dan kue berkualitas tinggi dengan rasa autentik. Pesan sekarang untuk pengalaman kuliner terbaik! Tersedia berbagai macam roti, kue ulang tahun, pastry, dan produk bakery lainnya.',
            'keywords' => 'roti, kue, bakery, nasywa, cake, roti manis, kue ulang tahun, pastry, kue tart, roti tawar, donat, croissant, muffin, cupcake, jakarta, bogor, depok, tangerang, bekasi',
            'canonical' => url('/'),
            'og_title' => 'Nasywa Cake & Bakery - Tempat Cinta Roti & Kue',
            'og_description' => 'Temukan koleksi roti dan kue terbaik di Nasywa Cake & Bakery. Fresh daily, kualitas premium dengan cita rasa yang tak terlupakan!',
            'og_image' => asset('assets/img/landing/logo.png'),
            'og_url' => url('/'),
            'twitter_card' => 'summary_large_image',
            'robots' => 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
            'author' => 'Nasywa Cake & Bakery',
            'theme_color' => '#B46B30',
        ];

        return array_merge($defaults, $options);
    }

    /**
     * Generate structured data for local business
     *
     * @param object $appSetting
     * @param object $products
     * @param array $options
     * @return array
     */
    public static function generateStructuredData($appSetting = null, $products = null, $options = [])
    {
        $structuredData = [
            '@context' => 'https://schema.org',
            '@type' => 'LocalBusiness',
            'name' => 'Nasywa Cake & Bakery',
            'description' => 'Bakery dan cake shop terbaik dengan produk berkualitas tinggi, menyediakan roti segar, kue ulang tahun, pastry, dan berbagai produk bakery lainnya.',
            'url' => url('/'),
            'logo' => asset('assets/img/landing/logo.png'),
            'image' => asset('assets/img/landing/hero_section.jpg'),
            'priceRange' => '$$',
            'servesCuisine' => ['Bakery', 'Pastry', 'Dessert', 'Bread'],
            'foundingDate' => '2020',
            'openingHours' => ['Mo-Su 08:00-20:00'],
            'paymentAccepted' => ['Cash', 'Credit Card', 'Bank Transfer', 'E-Wallet'],
            'currenciesAccepted' => 'IDR',
            '@id' => url('/'),
            'sameAs' => [
                // Add social media links when available
            ]
        ];

        // Add app setting data if available
        if ($appSetting) {
            if ($appSetting->phone) {
                $structuredData['telephone'] = $appSetting->phone;
            }
            if ($appSetting->email) {
                $structuredData['email'] = $appSetting->email;
            }
            if ($appSetting->address) {
                $structuredData['address'] = [
                    '@type' => 'PostalAddress',
                    'streetAddress' => $appSetting->address,
                    'addressLocality' => 'Jakarta',
                    'addressRegion' => 'DKI Jakarta',
                    'postalCode' => '12345',
                    'addressCountry' => 'ID',
                ];

                // Add geo coordinates if available
                $structuredData['geo'] = [
                    '@type' => 'GeoCoordinates',
                    'latitude' => '-6.2088',  // Jakarta coordinates as default
                    'longitude' => '106.8456'
                ];
            }
            if ($appSetting->whatsapp) {
                $structuredData['contactPoint'] = [
                    '@type' => 'ContactPoint',
                    'telephone' => $appSetting->whatsapp,
                    'contactType' => 'customer service',
                    'availableLanguage' => 'Indonesian'
                ];
            }
        }

        // Add product catalog if available
        if ($products && $products->count() > 0) {
            $offers = [];
            foreach ($products->take(20) as $product) {
                $images = json_decode($product->images, true) ?? [];
                $productImage = !empty($images) ? asset('storage/' . $images[0]) : asset('assets/img/landing/logo.png');

                $offers[] = [
                    '@type' => 'Product',
                    'name' => $product->name,
                    'description' => $product->description ?? 'Produk berkualitas dari Nasywa Cake & Bakery',
                    'image' => $productImage,
                    'category' => $product->category->name ?? 'Bakery',
                    'brand' => [
                        '@type' => 'Brand',
                        'name' => 'Nasywa Cake & Bakery'
                    ],
                    'offers' => [
                        '@type' => 'Offer',
                        'price' => $product->price ?? 0,
                        'priceCurrency' => 'IDR',
                        'availability' => 'https://schema.org/InStock',
                        'seller' => [
                            '@type' => 'Organization',
                            'name' => 'Nasywa Cake & Bakery'
                        ]
                    ]
                ];
            }

            $structuredData['hasOfferCatalog'] = [
                '@type' => 'OfferCatalog',
                'name' => 'Katalog Produk Nasywa Cake & Bakery',
                'itemListElement' => $offers
            ];
        }

        // Merge with custom options
        return array_merge($structuredData, $options);
    }

    /**
     * Generate meta tags array for view
     *
     * @param array $seoData
     * @return array
     */
    public static function generateMetaTags($seoData)
    {
        return [
            // Basic meta tags
            'title' => $seoData['title'],
            'description' => $seoData['description'],
            'keywords' => $seoData['keywords'],
            'canonical' => $seoData['canonical'],
            'robots' => $seoData['robots'] ?? 'index, follow',
            'author' => $seoData['author'] ?? 'Nasywa Cake & Bakery',
            'viewport' => 'width=device-width, initial-scale=1.0',
            'theme-color' => $seoData['theme_color'] ?? '#B46B30',

            // Open Graph tags
            'og:type' => 'website',
            'og:url' => $seoData['og_url'],
            'og:title' => $seoData['og_title'],
            'og:description' => $seoData['og_description'],
            'og:image' => $seoData['og_image'],
            'og:site_name' => 'Nasywa Cake & Bakery',
            'og:locale' => 'id_ID',

            // Twitter tags
            'twitter:card' => $seoData['twitter_card'],
            'twitter:url' => $seoData['og_url'],
            'twitter:title' => $seoData['og_title'],
            'twitter:description' => $seoData['og_description'],
            'twitter:image' => $seoData['og_image'],
        ];
    }

    /**
     * Detect if the user agent is a bot/crawler
     *
     * @param string $userAgent
     * @return bool
     */
    public static function isBot($userAgent = '')
    {
        if (empty($userAgent)) {
            $userAgent = request()->header('User-Agent', '');
        }

        $botPatterns = [
            'googlebot',
            'bingbot',
            'slurp',
            'duckduckbot',
            'baiduspider',
            'yandexbot',
            'facebookexternalhit',
            'twitterbot',
            'linkedinbot',
            'whatsapp',
            'telegrambot',
            'applebot',
            'crawler',
            'spider',
            'bot',
            'scraper',
            'facebook',
            'twitter',
            'linkedin',
            'instagram',
            'pinterest',
            'reddit',
            'discordbot'
        ];

        foreach ($botPatterns as $pattern) {
            if (stripos($userAgent, $pattern) !== false) {
                return true;
            }
        }

        return false;
    }

    /**
     * Generate breadcrumb structured data
     *
     * @param array $breadcrumbs
     * @return array
     */
    public static function generateBreadcrumbStructuredData($breadcrumbs = [])
    {
        $breadcrumbList = [
            '@context' => 'https://schema.org',
            '@type' => 'BreadcrumbList',
            'itemListElement' => []
        ];

        $defaultBreadcrumbs = [
            ['name' => 'Home', 'url' => url('/')]
        ];

        $allBreadcrumbs = array_merge($defaultBreadcrumbs, $breadcrumbs);

        foreach ($allBreadcrumbs as $index => $breadcrumb) {
            $breadcrumbList['itemListElement'][] = [
                '@type' => 'ListItem',
                'position' => $index + 1,
                'name' => $breadcrumb['name'],
                'item' => $breadcrumb['url']
            ];
        }

        return $breadcrumbList;
    }

    /**
     * Generate FAQ structured data
     *
     * @param array $faqs
     * @return array
     */
    public static function generateFaqStructuredData($faqs = [])
    {
        if (empty($faqs)) {
            // Default FAQs for bakery
            $faqs = [
                [
                    'question' => 'Apakah Nasywa Cake & Bakery menerima pesanan custom?',
                    'answer' => 'Ya, kami menerima pesanan kue custom untuk berbagai acara seperti ulang tahun, pernikahan, dan acara spesial lainnya. Silakan hubungi kami untuk konsultasi desain dan harga.'
                ],
                [
                    'question' => 'Berapa lama waktu pemesanan kue custom?',
                    'answer' => 'Untuk kue custom, kami membutuhkan waktu minimal 3-5 hari kerja tergantung tingkat kesulitan desain. Untuk pesanan dalam jumlah besar atau desain kompleks, mohon pesan lebih awal.'
                ],
                [
                    'question' => 'Apakah produk selalu fresh?',
                    'answer' => 'Ya, semua produk kami dibuat fresh setiap hari menggunakan bahan-bahan berkualitas tinggi. Kami tidak menggunakan bahan pengawet berbahaya.'
                ]
            ];
        }

        $faqStructuredData = [
            '@context' => 'https://schema.org',
            '@type' => 'FAQPage',
            'mainEntity' => []
        ];

        foreach ($faqs as $faq) {
            $faqStructuredData['mainEntity'][] = [
                '@type' => 'Question',
                'name' => $faq['question'],
                'acceptedAnswer' => [
                    '@type' => 'Answer',
                    'text' => $faq['answer']
                ]
            ];
        }

        return $faqStructuredData;
    }
}
