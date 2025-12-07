<?php

namespace App\Http\Controllers\global;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class AuthController extends Controller
{
    private function hasSignedIn()
    {
        if (Auth::check()) {
            return Inertia::location("/admin/dashboard");
        }
        return true;
    }

    public function signInView()
    {
        $this->hasSignedIn();
        return Inertia::render("Auth/SignIn", [
            "app_name" => config("app.name"),
        ]);
    }

    public function signIn(Request $request)
    {
        $credentials = $request->validate(
            [
                "email" => "required|email",
                "password" => "required",
            ],
            [
                "email.email" => "Format email tidak valid",
            ],
        );

        $user = User::where("email", $credentials["email"])->first();
        if (!$user || !Hash::check($credentials["password"], $user->password)) {
            return back()->withErrors([
                "message" => "Email atau password salah",
            ]);
        }

        if (Auth::attempt($credentials)) {
            return Inertia::location("/admin/dashboard");
        }

        return back()->withErrors([
            "message" => "Authentication failed",
        ]);
    }

    public function signOut($password_changed = false)
    {
        Auth::logout();
        if ($password_changed) {
            Session::flash(
                "success",
                "Password berhasil diubah. Silakan login kembali.",
            );
        } else {
            Session::flash("success", "Logout berhasil");
        }
        return Inertia::location("/auth/signin");
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            "current_password" => "required",
            "new_password" => "required|min:8|confirmed",
        ], [
            "new_password.confirmed" => "Konfirmasi password tidak sesuai.",
            "new_password.min" => "Password baru minimal terdiri dari 8 karakter.",
        ]);

        $auth = Auth::user();
        $user = User::find($auth->id);

        if (!Hash::check($request->current_password, $user->password)) {
            return back()->withErrors([
                "current_password" => "Password saat ini tidak sesuai.",
            ]);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return $this->signOut(true);
    }
}
