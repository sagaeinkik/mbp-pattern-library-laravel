<?php

namespace App\Http\Requests\PatternPreview;

use Illuminate\Foundation\Http\FormRequest;

class PatternPreviewRequest extends FormRequest
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
            "image" => "image|mimes:jpeg,png,jpg,gif|max:3000",
            "pattern_id" => "required|exists:patterns,id"
        ];
    }

    
}
