<?php

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PatternController;
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
        "index" => "categories.all", 
        "create" => "categories.add",
        "store" => "categories.new", 
        "show" => "categories.details", 
        "edit" => "categories.edit",
        "update" => "categories.update", 
        "destroy" => "categories.delete"
    ]);

    Route::resource("patterns", PatternController::class)->names([
        "index" => "patterns.all",
        "create" => "patterns.add", 
        "store" => "patterns.new",
    ]);

    //Wordpress sites
    Route::get("wordpress", function (){
        return Inertia::render("wpsites/index");
    })->name("wordpress.index");

});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
