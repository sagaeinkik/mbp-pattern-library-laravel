<?php

namespace App\Http\Requests\WPSites;

use Illuminate\Foundation\Http\FormRequest;

class WPSiteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "url" => "required|url:https|unique:wordpress_sites,url"
        ];
    }
}
