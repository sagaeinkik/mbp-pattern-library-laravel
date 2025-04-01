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
    Route::get('categories', [CategoryController::class, 'index'])->name('categories.index');

    //Patterns
    Route::get("patterns", function (){
        return Inertia::render("patterns");
    })->name("patterns.index");

    //Wordpress sites
    Route::get("wordpress", function (){
        return Inertia::render("wpsites");
    })->name("wordpress.index");
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
