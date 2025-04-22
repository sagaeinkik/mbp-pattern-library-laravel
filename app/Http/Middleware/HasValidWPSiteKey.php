<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use \App\Models\WordpressSite;

class HasValidWPSiteKey
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        //Get WP Site Key as bearer token from request headers
        $bearerToken = $request->bearerToken();

        // No site key
        if (is_null($bearerToken)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        //Check if site key exists in database
        $siteExists = WordpressSite::where('key', $bearerToken)->exists();

        if(!$siteExists) {
            return response()->json(['error' => 'Unauthorized'], 401);
        } 

        return $next($request);
    }
}
