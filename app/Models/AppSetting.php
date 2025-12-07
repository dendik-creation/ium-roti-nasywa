<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppSetting extends Model
{
    protected $guarded = ["id"];

    public static function getSetting()
    {
        $setting = self::first();
        if ($setting && $setting["social_media"] !== null) {
            $setting["social_media"] = json_decode(
                $setting["social_media"],
                true,
            );
        }
        return $setting;
    }
}
