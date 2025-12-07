<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $guarded = ["id"];
    protected $casts = ["category_id" => "integer"];

    public function category()
    {
        return $this->belongsTo(ProductCategory::class, "category_id");
    }
}
