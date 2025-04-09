<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Pattern;
use App\Models\Category;
use App\Models\PatternPreview;
use Illuminate\Http\Request;
use App\Http\Requests\Pattern\PatternRequest;

class PatternController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $patterns = Pattern::with(["patternPreviews", "category"])->get();

        return Inertia::render("patterns/index", [
            "patterns" => $patterns, 
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //Get categories for dropdown in view
        $categories = Category::all();

        return Inertia::render("patterns/add-pattern", [
            "categories" => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PatternRequest $patternRequest)
    {
        $request = request();
        //Validate 
        $validatedPattern = $patternRequest->validated(); 
        
        //Create pattern
        $pattern = Pattern::create($validatedPattern);

        //Store all images
        if (isset($validatedPattern["pattern_previews"]) && count($validatedPattern["pattern_previews"]) > 0) {
            foreach($request->file("pattern_previews") as $image) {
                $imagePath = $image->store("pattern-previews", "public");
    
                //Create pattern preview
                PatternPreview::create([
                    "image_path" => $imagePath,
                    "pattern_id" => $pattern->id
                ]);
            }
        }

        //Redirect to patterns page
        return to_route("patterns.all");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
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
