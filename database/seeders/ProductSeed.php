<?php

namespace Database\Seeders;

use App\Models\ProductCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Category
        ProductCategory::create([
            "name" => "Cake",
            "description" =>
                "Aneka cake lezat untuk berbagai acara seperti ulang tahun, pernikahan, dan perayaan lainnya.",
        ]);
        ProductCategory::create([
            "name" => "Bakery",
            "description" =>
                "Produk bakery yang baru dipanggang setiap hari: roti, pastry, dan kudapan segar berkualitas.",
        ]);
        ProductCategory::create([
            "name" => "Brownies",
            "description" =>
                "Brownies empuk dan fudgy dengan berbagai topping dan isian yang menggoda selera.",
        ]);
    }
}
