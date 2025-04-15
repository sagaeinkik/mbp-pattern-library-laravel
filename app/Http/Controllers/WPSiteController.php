<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\WPSites\WPSiteRequest;
use App\Models\WordpressSite;

class WPSiteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $wpSites = WordpressSite::all(); 

        return Inertia::render("wpsites/index", [
            "wpSites" => $wpSites
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("wpsites/add-wordpress-site");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(WPSiteRequest $wpRequest)
    {
        $validatedSite = $wpRequest->validated();
        
        //Create new site
        $wpSite = WordpressSite::create($validatedSite);

        return to_route("wordpress.details", $wpSite->id);
    }

    /**
     * Display the specified resource.
     */
    public function show(WordpressSite $WPSite)
    {
        $wpSite = WordpressSite::find($WPSite);

        return Inertia::render("wpsites/show-wordpress-site", [
            "wpSite" => $wpSite
        ]);
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
