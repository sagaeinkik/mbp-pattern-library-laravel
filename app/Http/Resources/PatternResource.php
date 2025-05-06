<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PatternResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            "description" => $this->description,
            'category' => PatternCategoryResource::make($this->whenLoaded('category')),
            // Flatten to single level array
            'patternPreviews' => $this->whenLoaded('patternPreviews')->map(function ($preview) {
                return $preview->image_path; 
            }),
        ];
    }
}
