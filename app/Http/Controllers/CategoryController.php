<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get all categories
        $categories = Category::withCount("pattern")->latest()->get();

        // Render view with categories
        return Inertia::render("categories/index", [
            "categories" => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("categories/add-category");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //Validate
        $validCategory = $request->validate([
            "name" => "required|min:2|max:255|unique:categories"
        ]);

        //Add to db
        Category::create($validCategory);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        // Render view with category
        if ($category) {
            $category->loadMissing("pattern.patternPreviews");
            
            return Inertia::render("categories/show-category", [
                "category" => $category
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {

        if ($category) {
            return Inertia::render("categories/edit-category", [
                "category" => $category
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        //Validate
        $validCategory = $request->validate([
            "name" => "required|min:2|max:255|unique:categories"
        ]);

        //Update in db
        $category->update($validCategory);

        //Redirect to resource
        return redirect()->route("categories.details", $category->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //Delete from db
        $category->delete();

        //Redirect to index
        return redirect()->route("categories.all");
    }
}
