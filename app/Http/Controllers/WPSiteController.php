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
        $wpSites = WordpressSite::latest()->get();

        // Check if the plugin file exists
        $pluginFilePath = storage_path("app/public/plugins/mbp-pattern-library.zip");
        $fileExists = file_exists($pluginFilePath);

        $url = config("app.url");

        return Inertia::render("wpsites/index", [
            "wpSites" => $wpSites, 
            "pluginUrl" => $fileExists ? asset("storage/plugins/mbp-pattern-library.zip") : null, 
            "appUrl" => $url . "/api"
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

        return redirect()->route("wordpress.all");
    }

    /**
     * Display the specified resource.
     */
    public function show(WordpressSite $wordpress)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(WordpressSite $wordpress)
    {
        return Inertia::render("wpsites/edit-wordpress-site", [
            "wpSite" => $wordpress
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(WPSiteRequest $wpRequest, WordpressSite $wordpress)
    {
        //Validate
        $validatedSite = $wpRequest->validated();

        //Update
        $wordpress->update($validatedSite);

        return redirect()->route("wordpress.all");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WordpressSite $wordpress)
    {
        //Delete site
        $wordpress->delete();

        return redirect()->route("wordpress.all");
    }
    /** 
    * Show zip file-input form
    */
    public function showPluginForm () {
        return Inertia::render("upload-plugin");
    }
    
    /** 
    * Post zip file to storage
    */
    public function storePlugin(Request $request) {
        $request->validate([
            "pluginFile" => "required|file|mimes:zip"
        ]);
        $uploadedFile = $request->file("pluginFile");

        // Validate file name 
        if($uploadedFile->getClientOriginalName() !== "mbp-pattern-library.zip") {
            return back()->withErrors(["pluginFile" => "Invalid file name."]);
        }

        // Store file in storage
        $uploadedFile->storeAs("plugins", $uploadedFile->getClientOriginalName(), "public");

        return Inertia::render("upload-plugin", [
            "success" => "Plugin uploaded successfully!"
        ]);
    }

}
