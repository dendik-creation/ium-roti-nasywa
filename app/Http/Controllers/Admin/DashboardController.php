<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Testimoni;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $total_category = ProductCategory::count();
        $total_product = Product::count();
        $total_testimonial = Testimoni::count();
        $donut_chart_testimonial = Testimoni::selectRaw(
            "rating, COUNT(*) as count",
        )
            ->groupBy("rating")
            ->get();
        $latest_testimonials = Testimoni::limit(5)->latest()->get();
        return Inertia::render("Dashboard", [
            "title" => "Dashboard",
            "description" => "Ringkasan data mengenai website ",
            "total_category" => $total_category,
            "total_product" => $total_product,
            "total_testimonial" => $total_testimonial,
            "donut_chart_testimonial" => $donut_chart_testimonial,
            "latest_testimonials" => $latest_testimonials,
        ]);
    }
}
