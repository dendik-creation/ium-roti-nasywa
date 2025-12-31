<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table("products", function (Blueprint $table) {
            $table->integer("order_number")->nullable();
        });

        // Set order_number to current id for all existing rows
        \DB::statement("UPDATE products SET order_number = id");

        // Make order_number not nullable after setting values
        Schema::table("products", function (Blueprint $table) {
            $table->integer("order_number")->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table("products", function (Blueprint $table) {
            $table->dropColumn("order_number");
        });
    }
};
