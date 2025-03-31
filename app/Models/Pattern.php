<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}
