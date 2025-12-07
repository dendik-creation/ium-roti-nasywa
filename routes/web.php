    <?php
    use App\Http\Controllers\Admin\ProductCategoryController;
    use App\Http\Controllers\Admin\ProductController;
    use App\Http\Controllers\DashboardController;
    use Illuminate\Support\Facades\Route;
    // Global Controllers
    use App\Http\Controllers\global\AuthController;

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
        });

