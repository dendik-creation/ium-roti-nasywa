<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Spatie\Image\Image;

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
            $extension = strtolower($image->getClientOriginalExtension());
            $filename = now()->format("YmdHisv") . "." . $extension;

            $tempPath = storage_path("app/tmp/{$filename}");
            if (!is_dir(dirname($tempPath))) {
                mkdir(dirname($tempPath), 0777, true);
            }

            $img = Image::load($image->getPathname())
                ->width(1280)
                ->height(1280);

            if (in_array($extension, ["jpg", "jpeg"])) {
                $img->quality(75);
            } elseif ($extension === "png") {
                $img->quality(7);
            }

            $img->save($tempPath);

            Storage::disk("public")->putFileAs(
                "products",
                new \Illuminate\Http\File($tempPath),
                $filename,
            );

            @unlink($tempPath);

            $imagePaths[] = "products/" . $filename;
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
        foreach ($existingImages as $oldPath) {
            Storage::disk("public")->delete($oldPath);
        }

        $newImagePaths = [];

        foreach ($request->file("images") as $uploadedFile) {
            $ext = strtolower($uploadedFile->getClientOriginalExtension());
            $filename = now()->format("YmdHisv") . "." . $ext;

            $tempPath = storage_path("app/tmp/{$filename}");
            if (!is_dir(dirname($tempPath))) {
                mkdir(dirname($tempPath), 0777, true);
            }

            $img = Image::load($uploadedFile->getPathname())
                ->width(1280)
                ->height(1280);

            if (in_array($ext, ["jpg", "jpeg"])) {
                $img->quality(75);
            } elseif ($ext === "png") {
                $img->quality(7);
            }

            $img->save($tempPath);

            Storage::disk("public")->putFileAs(
                "products",
                new \Illuminate\Http\File($tempPath),
                $filename,
            );

            @unlink($tempPath);

            $newImagePaths[] = "products/" . $filename;
        }

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
