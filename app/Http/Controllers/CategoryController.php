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
        $categories = Category::all();

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

        //Redirect to index
        return to_route("categories.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Get category
        $category = Category::find($id);

        // Render view with category
        if($category) {

            return Inertia::render("categories/show-category", [
                "category" => $category
            ]);
        } else {
            // Render 404 component
            return Inertia::render("not-found");
        };
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
