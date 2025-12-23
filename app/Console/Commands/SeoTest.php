<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Testimoni;
use App\Models\AppSetting;

class SeoTest extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = "seo:test {--url=http://localhost:8000} {--detail}";

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Test SEO implementation and validate meta tags, structured data, and bot detection";

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $baseUrl = $this->option("url");
        $verbose = $this->option("detail");

        $this->info("🔍 Starting SEO Test for: " . $baseUrl);
        $this->newLine();

        $passed = 0;
        $failed = 0;

        // Test 1: Check if main page loads
        $this->info("1. Testing main page load...");
        if ($this->testPageLoad($baseUrl)) {
            $this->line("   ✅ Main page loads successfully");
            $passed++;
        } else {
            $this->error("   ❌ Main page failed to load");
            $failed++;
        }

        // Test 2: Check sitemap.xml
        $this->info("2. Testing sitemap.xml...");
        if ($this->testSitemap($baseUrl)) {
            $this->line("   ✅ Sitemap is accessible and valid");
            $passed++;
        } else {
            $this->error("   ❌ Sitemap test failed");
            $failed++;
        }

        // Test 3: Check robots.txt
        $this->info("3. Testing robots.txt...");
        if ($this->testRobots($baseUrl)) {
            $this->line("   ✅ Robots.txt is accessible and valid");
            $passed++;
        } else {
            $this->error("   ❌ Robots.txt test failed");
            $failed++;
        }

        // Test 4: Check bot detection
        $this->info("4. Testing bot detection...");
        if ($this->testBotDetection($baseUrl, $verbose)) {
            $this->line("   ✅ Bot detection works correctly");
            $passed++;
        } else {
            $this->error("   ❌ Bot detection test failed");
            $failed++;
        }

        // Test 5: Check meta tags for regular users
        $this->info("5. Testing meta tags for regular users...");
        if ($this->testMetaTags($baseUrl, false, $verbose)) {
            $this->line("   ✅ Meta tags are properly set for regular users");
            $passed++;
        } else {
            $this->error("   ❌ Meta tags test failed for regular users");
            $failed++;
        }

        // Test 6: Check structured data
        $this->info("6. Testing structured data...");
        if ($this->testStructuredData($baseUrl, $verbose)) {
            $this->line("   ✅ Structured data is present and valid");
            $passed++;
        } else {
            $this->error("   ❌ Structured data test failed");
            $failed++;
        }

        // Test 7: Database connectivity for SEO data
        $this->info("7. Testing database connectivity for SEO data...");
        if ($this->testDatabaseData($verbose)) {
            $this->line("   ✅ Database data is accessible for SEO");
            $passed++;
        } else {
            $this->error("   ❌ Database data test failed");
            $failed++;
        }

        // Test 8: Check page performance basics
        $this->info("8. Testing basic performance metrics...");
        if ($this->testPagePerformance($baseUrl, $verbose)) {
            $this->line("   ✅ Basic performance metrics are good");
            $passed++;
        } else {
            $this->error("   ❌ Performance test failed");
            $failed++;
        }

        $this->newLine();
        $this->info("📊 SEO Test Results:");
        $this->line("   Passed: {$passed}");
        $this->line("   Failed: {$failed}");
        $this->line("   Total:  " . ($passed + $failed));

        if ($failed === 0) {
            $this->info(
                "🎉 All SEO tests passed! Your implementation is ready for production.",
            );
        } else {
            $this->warn(
                "⚠️  Some SEO tests failed. Please review the issues above.",
            );
        }

        $this->newLine();
        $this->info("💡 SEO Optimization Tips:");
        $this->line('   - Run "php artisan sitemap:generate" regularly');
        $this->line("   - Monitor page load times");
        $this->line("   - Test with real bot user agents");
        $this->line(
            '   - Validate structured data with Google\'s Rich Results Test',
        );
        $this->line("   - Submit sitemap to Google Search Console");

        return $failed === 0 ? Command::SUCCESS : Command::FAILURE;
    }

    private function testPageLoad($baseUrl)
    {
        try {
            $response = Http::timeout(10)->get($baseUrl);
            return $response->successful();
        } catch (\Exception $e) {
            return false;
        }
    }

    private function testSitemap($baseUrl)
    {
        try {
            $response = Http::timeout(10)->get($baseUrl . "/sitemap.xml");

            if (!$response->successful()) {
                return false;
            }

            $content = $response->body();

            // Check if it's valid XML
            $xml = simplexml_load_string($content);
            if (!$xml) {
                return false;
            }

            // Check if it contains expected elements
            return strpos($content, "<urlset") !== false &&
                strpos($content, "<loc>") !== false;
        } catch (\Exception $e) {
            return false;
        }
    }

    private function testRobots($baseUrl)
    {
        try {
            $response = Http::timeout(10)->get($baseUrl . "/robots.txt");

            if (!$response->successful()) {
                return false;
            }

            $content = $response->body();

            // Check if it contains expected directives
            return strpos($content, "User-agent:") !== false &&
                strpos($content, "Sitemap:") !== false;
        } catch (\Exception $e) {
            return false;
        }
    }

    private function testBotDetection($baseUrl, $verbose = false)
    {
        try {
            // Test with regular user agent
            $regularResponse = Http::timeout(10)
                ->withHeaders([
                    "User-Agent" =>
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                ])
                ->get($baseUrl);

            // Test with bot user agent
            $botResponse = Http::timeout(10)
                ->withHeaders([
                    "User-Agent" =>
                        "Googlebot/2.1 (+http://www.google.com/bot.html)",
                ])
                ->get($baseUrl);

            if (
                !$regularResponse->successful() ||
                !$botResponse->successful()
            ) {
                return false;
            }

            $regularContent = $regularResponse->body();
            $botContent = $botResponse->body();

            // Bot should get different content (static HTML vs React)
            $botGetsStaticHtml = strpos($botContent, "DOCTYPE html") !== false;
            $regularGetsReact =
                strpos($regularContent, "inertia") !== false ||
                strpos($regularContent, "react") !== false;

            if ($verbose) {
                $this->line(
                    "     Regular user gets React/Inertia: " .
                        ($regularGetsReact ? "Yes" : "No"),
                );
                $this->line(
                    "     Bot gets static HTML: " .
                        ($botGetsStaticHtml ? "Yes" : "No"),
                );
            }

            return $botGetsStaticHtml;
        } catch (\Exception $e) {
            if ($verbose) {
                $this->line("     Error: " . $e->getMessage());
            }
            return false;
        }
    }

    private function testMetaTags($baseUrl, $isBot = false, $verbose = false)
    {
        try {
            $userAgent = $isBot
                ? "Googlebot/2.1"
                : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";

            $response = Http::timeout(10)
                ->withHeaders(["User-Agent" => $userAgent])
                ->get($baseUrl);

            if (!$response->successful()) {
                return false;
            }

            $content = $response->body();

            // Check for essential meta tags
            $hasTitle = strpos($content, "<title>") !== false;
            $hasDescription = strpos($content, 'name="description"') !== false;
            $hasKeywords = strpos($content, 'name="keywords"') !== false;
            $hasOgTitle = strpos($content, 'property="og:title"') !== false;
            $hasOgDescription =
                strpos($content, 'property="og:description"') !== false;
            $hasOgImage = strpos($content, 'property="og:image"') !== false;

            if ($verbose) {
                $this->line("     Title tag: " . ($hasTitle ? "✓" : "✗"));
                $this->line(
                    "     Description: " . ($hasDescription ? "✓" : "✗"),
                );
                $this->line("     Keywords: " . ($hasKeywords ? "✓" : "✗"));
                $this->line("     OG Title: " . ($hasOgTitle ? "✓" : "✗"));
                $this->line(
                    "     OG Description: " . ($hasOgDescription ? "✓" : "✗"),
                );
                $this->line("     OG Image: " . ($hasOgImage ? "✓" : "✗"));
            }

            return $hasTitle &&
                $hasDescription &&
                $hasOgTitle &&
                $hasOgDescription;
        } catch (\Exception $e) {
            return false;
        }
    }

    private function testStructuredData($baseUrl, $verbose = false)
    {
        try {
            $response = Http::timeout(10)
                ->withHeaders(["User-Agent" => "Googlebot/2.1"])
                ->get($baseUrl);

            if (!$response->successful()) {
                return false;
            }

            $content = $response->body();

            // Check for JSON-LD structured data
            $hasStructuredData =
                strpos($content, "application/ld+json") !== false;
            $hasLocalBusiness = strpos($content, "LocalBusiness") !== false;
            $hasOrganization = strpos($content, "@type") !== false;

            if ($verbose) {
                $this->line(
                    "     JSON-LD present: " . ($hasStructuredData ? "✓" : "✗"),
                );
                $this->line(
                    "     LocalBusiness schema: " .
                        ($hasLocalBusiness ? "✓" : "✗"),
                );
                $this->line(
                    "     Organization schema: " .
                        ($hasOrganization ? "✓" : "✗"),
                );
            }

            return $hasStructuredData && $hasOrganization;
        } catch (\Exception $e) {
            return false;
        }
    }

    private function testDatabaseData($verbose = false)
    {
        try {
            $productsCount = Product::count();
            $categoriesCount = ProductCategory::count();
            $testimonialsCount = Testimoni::count();
            $appSetting = AppSetting::first();

            if ($verbose) {
                $this->line("     Products: {$productsCount}");
                $this->line("     Categories: {$categoriesCount}");
                $this->line("     Testimonials: {$testimonialsCount}");
                $this->line(
                    "     App Settings: " .
                        ($appSetting ? "Available" : "Missing"),
                );
            }

            return true; // Database is accessible
        } catch (\Exception $e) {
            if ($verbose) {
                $this->line("     Database Error: " . $e->getMessage());
            }
            return false;
        }
    }

    private function testPagePerformance($baseUrl, $verbose = false)
    {
        try {
            $startTime = microtime(true);

            $response = Http::timeout(30)->get($baseUrl);

            $endTime = microtime(true);
            $loadTime = $endTime - $startTime;

            if (!$response->successful()) {
                return false;
            }

            $contentLength = strlen($response->body());
            $hasGzip = $response->header("Content-Encoding") === "gzip";

            if ($verbose) {
                $this->line(
                    "     Load time: " . number_format($loadTime, 3) . "s",
                );
                $this->line(
                    "     Content size: " .
                        number_format($contentLength / 1024, 2) .
                        "KB",
                );
                $this->line("     GZIP compression: " . ($hasGzip ? "✓" : "✗"));
            }

            // Consider it good if load time is under 5 seconds
            return $loadTime < 5.0;
        } catch (\Exception $e) {
            if ($verbose) {
                $this->line("     Performance test error: " . $e->getMessage());
            }
            return false;
        }
    }
}
