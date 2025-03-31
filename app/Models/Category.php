<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    
    protected $fillable = [
        "name"
    ];

    //relationship with pattern
    public function pattern()
    {
        return $this->hasMany(Pattern::class);
    }
}
