<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class PatternPreview extends Model
{
    //
    protected $fillable = [
        "image_path", 
        "pattern_id"
    ];

    //Relationship with pattern
    public function pattern()
    {
        return $this->belongsTo(Pattern::class);
    }

    //URL for image
    protected function imagePath(): Attribute 
    {
        return Attribute::make(
            get: fn () => !empty($this->image_path) ? url('storage/pattern-previews/' . $this->image_path) : null,
        );
    }

}
