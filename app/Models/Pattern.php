<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Pattern extends Model
{
    
    protected $fillable = [
        "title", 
        "description", 
        "pattern_data", 
        "category_id"
    ];

    //relationship with category 
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    //relationship with pattern previews
    public function patternPreviews()
    {
        return $this->hasMany(PatternPreview::class);
    }

    protected static function booted() {
        parent::boot();

        static::deleting(function (Pattern $pattern) {

            foreach ($pattern->patternPreviews as $preview) {
                $imagePath = $preview->getRawOriginal("image_path");

                if ($imagePath && Storage::disk("public")->exists($imagePath)) {
                    Storage::disk("public")->delete($imagePath);
                }
            }
        });
    }

}
