<?php

namespace Database\Seeders;

use App\Models\Testimoni;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TestimoniSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Testimonials From Google Maps Review
        Testimoni::create([
            "customer_name" => "Eko Hapsari",
            "rating" => 5,
            "comment" => "Gak pernah kecewa sama roti Nasywa, hidden gem roti dan masakan catering ya juga juara....lop e lope deh Lainnya"
        ]);

        Testimoni::create([
            "customer_name" => "Ana Fara",
            "rating" => 5,
            "comment" => "Pelayanan ok, roti & cake hrg merakyat & bisa diantar sampai rumah jd tdk repot2 ambil"
        ]);

        Testimoni::create([
            "customer_name" => "Ana Fara",
            "rating" => 5,
            "comment" => "Pilihan rotinya banyak, sekarang bisa pesan cathering juga disini"
        ]);

        Testimoni::create([
            "customer_name" => "Salsabila A",
            "rating" => 5,
            "comment" => "Bakery-nya lengkap, banyak pilihan roti sampai jajanan basah. Harganya juga cukup terjangkau 👍👍"
        ]);

        Testimoni::create([
            "customer_name" => "Muhammad Attar",
            "rating" => 5,
            "comment" => "roti yang enak dan lembut bunda 👍"
        ]);

        Testimoni::create([
            "customer_name" => "Pramudina Hida",
            "rating" => 5,
            "comment" => "Sangat lezad😍"
        ]);

        Testimoni::create([
            "customer_name" => "ziffi_hilya official",
            "rating" => 5,
            "comment" => "Roti nya enak2 dan lembut bgt, harganya jg terjangkau"
        ]);
    }
}
