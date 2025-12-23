<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Testimoni;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = "sitemap:generate";

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Generate the sitemap for the website";

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info("Generating sitemap...");

        $sitemap = Sitemap::create();

        // Add main page with highest priority
        $sitemap->add(
            Url::create("/")
                ->setLastModificationDate(now())
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
                ->setPriority(1.0),
        );

        // Add main sections with high priority
        $sections = [
            "home" => 0.9,
            "about" => 0.8,
            "products" => 0.9,
            "testimonial" => 0.7,
            "contact" => 0.8,
        ];

        foreach ($sections as $section => $priority) {
            $sitemap->add(
                Url::create("/#" . $section)
                    ->setLastModificationDate(now())
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
                    ->setPriority($priority),
            );
        }

        // Add products if any exist
        $products = Product::latest()->get();
        $this->info("Adding {$products->count()} products to sitemap...");

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
        $this->info("Adding {$categories->count()} categories to sitemap...");

        foreach ($categories as $category) {
            $sitemap->add(
                Url::create("/#products?category=" . $category->id)
                    ->setLastModificationDate($category->updated_at)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
                    ->setPriority(0.7),
            );
        }

        // Save sitemap to public directory
        $sitemapPath = public_path("sitemap.xml");
        $sitemap->writeToFile($sitemapPath);

        $this->info("Sitemap generated successfully at: {$sitemapPath}");

        // Count URLs manually since getTags() returns array
        $totalUrls = 0;
        if (method_exists($sitemap, "getTags")) {
            $tags = $sitemap->getTags();
            $totalUrls = is_array($tags) ? count($tags) : $tags->count();
        }

        $this->info("Total URLs: " . $totalUrls);

        return Command::SUCCESS;
    }
}
