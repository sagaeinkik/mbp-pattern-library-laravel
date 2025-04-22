<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\HasValidWPSiteKey;
use App\Http\Controllers\api\WPApiController;

Route::get('/hello', function (Request $request) {
    return response()->json(['message' => 'Hello, World!']);
})->middleware(HasValidWPSiteKey::class);

Route::middleware(HasValidWPSiteKey::class)->group(function () {
    Route::get("/block-patterns", [WPApiController::class, "blockpatterns"]);
    Route::get("/block-patterns/{id}", [WPApiController::class, "blockpatternjson"]);
});