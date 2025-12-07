<?php

namespace App\Http\Controllers\global;

use App\Http\Controllers\Controller;
use App\Models\AppSetting;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Testimoni;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
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
            ->latest()
            ->get()
            ->map(function ($item) {
                $item->images = json_decode($item->images, true) ?: [];
                return $item;
            });
        $testimonials = Testimoni::limit("5")->latest()->get();
        return Inertia::render("Landing/Index", [
            "categories" => $categories,
            "products" => $products,
            "app_setting" => $app_setting,
            "testimonials" => $testimonials,
            'is_logged_in' => Auth::check(),
        ]);
    }

    public function storeTestimonial(Request $request)
    {
        $request->validate([
            "customer_name" => "required|string|max:255",
            "rating" => "required|integer|min:1|max:5",
            "comment" => "required|string",
        ]);

        Testimoni::create($request->all());

        return redirect()->back()->with("success", "Terima kasih atas ulasan Anda!");
    }
}
