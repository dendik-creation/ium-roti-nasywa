<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\AppSetting;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Testimoni;
use Illuminate\Http\Response;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class SeoController extends Controller
{
    public function sitemap()
    {
        $sitemap = Sitemap::create();

        // Add main page with high priority
        $sitemap->add(
            Url::create("/")
                ->setLastModificationDate(now())
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
                ->setPriority(1.0),
        );

        // Add sections as anchor links with good priority
        $sections = ["home", "about", "products", "testimonial", "contact"];
        foreach ($sections as $section) {
            $sitemap->add(
                Url::create("/#" . $section)
                    ->setLastModificationDate(now())
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
                    ->setPriority(0.8),
            );
        }

        // Add products if any exist
        $products = Product::latest()->get();
        foreach ($products as $product) {
            $sitemap->add(
                Url::create("/#products?product=" . $product->id)
                    ->setLastModificationDate($product->updated_at)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
                    ->setPriority(0.6),
            );
        }

        // Add categories
        $categories = ProductCategory::all();
        foreach ($categories as $category) {
            $sitemap->add(
                Url::create("/#products?category=" . $category->id)
                    ->setLastModificationDate($category->updated_at)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
                    ->setPriority(0.7),
            );
        }

        return response($sitemap->render(), 200, [
            "Content-Type" => "application/xml",
        ]);
    }

    public function robots()
    {
        $robots = "User-agent: *\n";
        $robots .= "Disallow: /admin\n";
        $robots .= "Disallow: /auth\n";
        $robots .= "Disallow: /storage\n";
        $robots .= "Allow: /\n";
        $robots .= "Allow: /assets/\n";
        $robots .= "\n";
        $robots .= "Sitemap: " . url("/sitemap.xml") . "\n";

        // Add crawl delay for politeness
        $robots .= "\n";
        $robots .= "Crawl-delay: 1\n";

        return response($robots, 200, [
            "Content-Type" => "text/plain",
        ]);
    }
}
