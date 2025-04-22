<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pattern;

class WPApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function blockpatterns()
    {
        //Get all patterns with previews and categories
        $patterns = Pattern::with(["patternPreviews", "category"])->latest()->get();

        if($patterns->isEmpty()) {
            return response()->json(['message' => 'No patterns found'], 404);
        }
        return response()->json($patterns, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Get block pattern as JSON for WP
     */
    public function blockpatternjson(int $id)
    {
        //Get pattern by ID
        $pattern = Pattern::find($id);

        if(!$pattern) {
            return response()->json(['message' => 'Pattern not found'], 404);
        }

        // Turn into WordPress BP JSON format
        $patternJson = [
            "__file" => "wp_block",
            "title" => $pattern->title, 
            "content" => $pattern->pattern_data,
            "syncStatus" => "unsynced"
        ];

        return response()->json($patternJson, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
