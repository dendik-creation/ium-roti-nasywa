<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimoni;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query("search", null);
        $rating = $request->query("rating", null);
        $testimonials = Testimoni::when($search, function ($query, $search) {
            $query
                ->where("customer_name", "like", "%{$search}%")
                ->orWhere("comment", "like", "%{$search}%");
        })
            ->when($rating, function ($query, $rating) {
                $query->where("rating", $rating);
            })
            ->latest()
            ->paginate(config("custom.default.pagination"));

        return Inertia::render("Testimonial/Index", [
            "title" => "Daftar Testimoni Pelanggan",
            "description" => "Pantau testimoni dari pelanggan Anda di sini",
            "testimonials" => $testimonials,
            "search" => $search,
            "rating" => $rating,
        ]);
    }
}
