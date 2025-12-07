<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AppSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Storage;

class AppSettingController extends Controller
{
    public function index()
    {
        $app_setting = AppSetting::getSetting();
        return Inertia::render("AppSetting/Index", [
            "title" => "Pengaturan Sistem",
            "description" =>
                "Kelola informasi terkait pengaturan sistem aplikasi",
            "app_setting" => $app_setting,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            "whatsapp_number" => ["required", "string", "max:20"],
            "social_media" => ["required", "array"],
            "time_operational" => ["required"],
        ]);

        $app_setting = AppSetting::first();
        if ($app_setting) {
            $app_setting->update([
                "whatsapp_number" => $validated["whatsapp_number"],
                "social_media" => json_encode($validated["social_media"]),
                "time_operational" => $validated["time_operational"],
            ]);
        } else {
            AppSetting::create([
                "whatsapp_number" => $validated["whatsapp_number"],
                "social_media" => json_encode($validated["social_media"]),
                "time_operational" => $validated["time_operational"],
            ]);
        }
        Session::flash("success", "Pengaturan berhasil diperbarui");
        return Inertia::location(route("app-setting.index"));
    }
}
