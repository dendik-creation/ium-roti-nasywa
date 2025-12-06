<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Session;

class ProductCategoryController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query("search", null);
        $categories = ProductCategory::when($search, function (
            $query,
            $search,
        ) {
            $query->where("name", "like", "%{$search}%");
        })->paginate(config("custom.default.pagination"));
        return Inertia::render("ProductCategory/Index", [
            "title" => "Daftar Kategori Produk",
            "description" =>
                "Kelola informasi terkait daftar kategori produk dibawah ini",
            "categories" => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            "name" => ["required", "string", "max:255"],
            "description" => ["nullable", "string"],
        ]);
        ProductCategory::create($data);
        Session::flash("success", "Kategori berhasil ditambahkan");
        return Inertia::location(route("category.index"));
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            "name" => ["required", "string", "max:255"],
            "description" => ["nullable", "string"],
        ]);
        $productCategory = ProductCategory::findOrFail($id);
        $productCategory->update($data);
        Session::flash("success", "Kategori berhasil diperbarui");
        return Inertia::location(route("category.index"));
    }

    public function destroy($id)
    {
        $productCategory = ProductCategory::findOrFail($id);
        $productCategory->delete();
        Session::flash("success", "Kategori berhasil dihapus");
        return Inertia::location(route("category.index"));
    }
}
