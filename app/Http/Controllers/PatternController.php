<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Pattern;
use App\Models\Category;
use App\Models\PatternPreview;
use App\Http\Requests\Pattern\StorePatternRequest;
use App\Http\Requests\Pattern\UpdatePatternRequest;
use Illuminate\Support\Facades\Storage;

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
    public function store(StorePatternRequest $patternRequest)
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
        return to_route("patterns.details", $pattern->id);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pattern $pattern)
    {
        //Get pattern with previews and category
        $pattern = Pattern::with(["patternPreviews", "category"])->find($pattern->id);

        return Inertia::render("patterns/show-pattern", [
            "pattern" => $pattern
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pattern $pattern)
    {
        //Get pattern with previews and category
        $pattern = Pattern::with(["patternPreviews", "category"])->find($pattern->id);

        //Get categories for dropdown in view
        $categories = Category::all();

        return Inertia::render("patterns/edit-pattern", [
            "pattern" => $pattern,
            "categories" => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePatternRequest $patternRequest, Pattern $pattern)
    {
        $request = request();

        //Validate
        $validatedPattern = $patternRequest->validated();

        //Update pattern
        $pattern->update($validatedPattern);

        //Check for previews to delete
        if (isset($validatedPattern["previews_to_delete"]) && count($validatedPattern["previews_to_delete"]) > 0) {
            foreach ($validatedPattern["previews_to_delete"] as $previewId) {
                $preview = PatternPreview::find($previewId);

                //Remove from storage 
                $imagePath = $preview->getRawOriginal("image_path");

                if ($imagePath && Storage::disk("public")->exists($imagePath)) {
                    Storage::disk("public")->delete($imagePath);
                }

                //Remove from db
                $preview->delete();
            }
        }

        //Store new previews
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

        return to_route("patterns.details", $pattern->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pattern $pattern)
    {
        
        $pattern::destroy($pattern->id);

        return to_route("patterns.all");
    }
}
