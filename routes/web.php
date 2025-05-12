<?php

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PatternController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\WPSiteController;
use App\Models\Pattern;
use App\Models\WordpressSite;
use App\Models\Category;


Route::get('/', function (Request $request) {
    //Redirect user to dashboard
    if (Auth::check()) {
        return redirect()->route("dashboard");
    }

    //Redirect user to login-page
    return Inertia::render('auth/login', [
        'canResetPassword' => Route::has('password.request'),
        'status' => $request->session()->get('status'),
    ]);
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {

        //Get counts
        $patternCount = Pattern::count();
        $categoryCount = Category::count();
        $wordpressCount = WordpressSite::count();

        return Inertia::render('dashboard', [
            'patternCount' => $patternCount,
            'categoryCount' => $categoryCount,
            'wordpressCount' => $wordpressCount,
        ]);
    })->name('dashboard');

    //Categories
    Route::resource("categories", CategoryController::class)->names([
        "index" => "categories.all", 
        "create" => "categories.add",
        "store" => "categories.new", 
        "show" => "categories.details", 
        "edit" => "categories.edit",
        "update" => "categories.update", 
        "destroy" => "categories.delete"
    ]);

    //Block patterns
    Route::resource("patterns", PatternController::class)->names([
        "index" => "patterns.all",
        "create" => "patterns.add", 
        "store" => "patterns.new",
        "show" => "patterns.details",
        "edit" => "patterns.edit",
        "update" => "patterns.update",
        "destroy" => "patterns.delete"
    ]);

    //Wordpress sites
    Route::resource("wordpress", WPSiteController::class)->names([
        "index" => "wordpress.all", 
        "create" => "wordpress.add",
        "store" => "wordpress.new",
        "edit" => "wordpress.edit",
        "update" => "wordpress.update",
        "destroy" => "wordpress.delete"
    ]);

    // Plugin form
    Route::get("plugin-form", [WPSiteController::class, "showPluginForm"])->name("plugin-form.show");
    Route::post("plugin-form", [WPSiteController::class, "storePlugin"])->name("plugin-form.upload");

});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
