<?php

namespace App\Http\Requests\Pattern;

use Illuminate\Foundation\Http\FormRequest;

class PatternRequest extends FormRequest
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
            "title" => "required|min:2|max:255",
            "description" => "required|min:2|max:255",
            "pattern_data" => "required",
            "category_id" => "required|exists:categories,id",
            "pattern_previews.*" => "image|mimes:jpeg,png,jpg,gif|max:3000"
        ];
    }
}
