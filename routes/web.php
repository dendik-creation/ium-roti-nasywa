    <?php
    use App\Http\Controllers\Admin\AppSettingController;
    use Illuminate\Support\Facades\Route;
    // Global Controllers
    use App\Http\Controllers\global\AuthController;
    // Admin Controllers
    use App\Http\Controllers\Admin\ProductCategoryController;
    use App\Http\Controllers\Admin\ProductController;
    use App\Http\Controllers\Admin\TestimonialController;
    use App\Http\Controllers\Admin\DashboardController;

    Route::get("/", [AuthController::class, "signedInStatus"])->name("login");
    Route::prefix("auth")->group(function () {
        Route::get("/signin", [AuthController::class, "signInView"])
            ->name("auth.signin.index")
            ->middleware("guest");

        Route::post("/signin", [AuthController::class, "signIn"])
            ->middleware("guest")
            ->name("auth.signin.store");
    });
    Route::post("/auth/signout", [AuthController::class, "signOut"])
        ->middleware("auth")
        ->name("auth.signout.store");

    Route::prefix("admin")
        ->middleware("auth")
        ->group(function () {
            Route::get("/dashboard", [
                DashboardController::class,
                "index",
            ])->name("dashboard.index");

            // Product Category
            Route::prefix("/category")->group(function () {
                Route::get("/", [
                    ProductCategoryController::class,
                    "index",
                ])->name("category.index");
                Route::post("/", [
                    ProductCategoryController::class,
                    "store",
                ])->name("category.store");
                Route::put("/{id}", [
                    ProductCategoryController::class,
                    "update",
                ])->name("category.update");
                Route::delete("/{id}", [
                    ProductCategoryController::class,
                    "destroy",
                ])->name("category.delete");
            });

            // Product
            Route::prefix("/product")->group(function () {
                Route::get("/", [ProductController::class, "index"])->name(
                    "product.index",
                );
                Route::post("/", [ProductController::class, "store"])->name(
                    "product.store",
                );
                Route::put("/{id}", [ProductController::class, "update"])->name(
                    "product.update",
                );
                Route::delete("/{id}", [
                    ProductController::class,
                    "destroy",
                ])->name("product.delete");
            });

            // Testimonial
            Route::prefix("/testimonial")->group(function () {
                Route::get("/", [TestimonialController::class, "index"])->name(
                    "testimonial.index",
                );
            });

            // App Setting
            Route::prefix("/app-setting")->group(function () {
                Route::get("/", [AppSettingController::class, "index"])->name(
                    "app-setting.index",
                );
                Route::put("/update", [
                    AppSettingController::class,
                    "update",
                ])->name("app-setting.update");
            });
        });

