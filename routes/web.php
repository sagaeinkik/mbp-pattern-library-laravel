<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\CategoryController;


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
        return Inertia::render('dashboard');
    })->name('dashboard');

    //Categories
    Route::resource("categories", CategoryController::class)->names([
        "index" => "categories.index", 
        "create" => "categories.create",
        "store" => "categories.store", 
        "show" => "categories.show"
    ]);

    //Patterns
    Route::get("patterns", function (){
        return Inertia::render("patterns/index");
    })->name("patterns.index");

    //Wordpress sites
    Route::get("wordpress", function (){
        return Inertia::render("wpsites/index");
    })->name("wordpress.index");


    //Catch-all authenticated
    Route::fallback(function () {
        return Inertia::render('not-found');
    });
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
