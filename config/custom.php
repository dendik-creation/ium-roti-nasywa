<?php
return [
    "default" => [
        "pagination" => 10,
        "user_pass" => env("DEFAULT_USER_PASS", "12345"),
        "user_email" => env("DEFAULT_USER_EMAIL", "admin@example.com"),
        "whatsapp_number" => env("DEFAULT_WHATSAPP_NUMBER", "081234567890"),
    ],
];
