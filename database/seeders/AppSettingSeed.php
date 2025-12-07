<?php

namespace Database\Seeders;

use App\Models\AppSetting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AppSettingSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AppSetting::create([
            "whatsapp_number" => "081325059037",
            "google_maps_url" => "https://maps.app.goo.gl/dRL3erYZxv2xbVgA6",
            "social_media" => json_encode([
                [
                    "platform" => "INSTAGRAM",
                    "url" => "https:/instagram.com/rotinaywa_real",
                ],
                [
                    "platform" => "TIKTOK",
                    "url" => "https:/tiktom.com/@nasywa_bakery",
                ],
            ]),
            "time_operational" => "Senin - Minggu, pukul 08:00 - 20:00",
        ]);
    }
}
