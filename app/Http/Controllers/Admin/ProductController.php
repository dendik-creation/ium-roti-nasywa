<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query("search", null);
        $category = $request->query("category", null);
        $categories = ProductCategory::select("id", "name")
            ->get()
            ->map(function ($item) {
                return [
                    "value" => $item->id,
                    "label" => $item->name,
                ];
            });
        $products = Product::with("category")
            ->when($search, function ($query, $search) {
                $query->where("name", "like", "%{$search}%");
            })
            ->when($category, function ($query, $category) {
                $query->where("category_id", $category);
            })
            ->paginate(config("custom.default.pagination"));
        $products->getCollection()->transform(function ($item) {
            $item->images = json_decode($item->images, true) ?: [];
            return $item;
        });
        return Inertia::render("Product/Index", [
            "title" => "Daftar Produk",
            "description" =>
                "Kelola informasi terkait daftar produk dibawah ini",
            "products" => $products,
            "categories" => $categories,
            "search" => $search,
            "category" => $category,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            "name" => ["required", "string", "max:255"],
            "description" => ["required", "string"],
            "price" => ["required", "integer"],
            "category_id" => [
                "required",
                "integer",
                "exists:product_categories,id",
            ],
            "images" => ["required"],
        ]);
        $images = $request->file("images");
        $imagePaths = [];
        foreach ($images as $image) {
            $filename =
                now()->format("YmdHisv") .
                "." .
                $image->getClientOriginalExtension();
            $path = Storage::disk("public")->putFileAs(
                "products",
                $image,
                $filename,
            );
            $imagePaths[] = $path;
        }
        $data["images"] = json_encode($imagePaths);
        Product::create($data);
        Session::flash("success", "Produk berhasil ditambahkan");
        return Inertia::location(route("product.index"));
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            "name" => ["required", "string", "max:255"],
            "description" => ["required", "string"],
            "price" => ["required", "integer"],
            "category_id" => [
                "nullable",
                "integer",
                "exists:product_categories,id",
            ],
            "images" => ["required"],
        ]);

        $product = Product::findOrFail($id);
        $existingImages = json_decode($product->images, true) ?: [];
        // Delete all existing images from storage
        foreach ($existingImages as $imagePath) {
            if (Storage::disk("public")->exists($imagePath)) {
                Storage::disk("public")->delete($imagePath);
            }
        }
        // Handle new images
        $newImagePaths = [];
        if ($request->hasFile("images")) {
            $images = $request->file("images");
            foreach ($images as $image) {
                $filename =
                    now()->format("YmdHisv") .
                    "." .
                    $image->getClientOriginalExtension();
                $path = Storage::disk("public")->putFileAs(
                    "products",
                    $image,
                    $filename,
                );
                $newImagePaths[] = $path;
            }
        }
        // Replace with new images only
        $data["images"] = json_encode($newImagePaths);

        $product->update($data);
        Session::flash("success", "Produk berhasil diperbarui");
        return Inertia::location(route("product.index"));
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $images = json_decode($product->images, true) ?: [];
        foreach ($images as $imagePath) {
            if (Storage::disk("public")->exists($imagePath)) {
                Storage::disk("public")->delete($imagePath);
            }
        }
        $product->delete();
        Session::flash("success", "Produk berhasil dihapus");
        return Inertia::location(route("product.index"));
    }
}
