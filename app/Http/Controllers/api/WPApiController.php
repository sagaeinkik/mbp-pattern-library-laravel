<?php

namespace App\Http\Controllers\api;

use App\Models\Pattern;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\PatternResource;
use App\Http\Resources\PatternJsonResource;
use App\Models\WordpressSite;

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
        return response()->json(PatternResource::collection($patterns), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /* Activate site key */
    public function activateKey(Request $request)
    {
        // Set activated_at to now
        $site = WordpressSite::where('key', $request->bearerToken())->first();
        $site->activated_at = now();
        $site->save();

        return response()->json([
            'message' => 'Site key activated',
            'site' => $site
        ], 200);
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

        return response()->json(new PatternJsonResource($pattern), 200);
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
