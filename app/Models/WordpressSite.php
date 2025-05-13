<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Database\Factories\WordpressSiteFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class WordpressSite extends Model
{
    use HasFactory;

    
    protected $fillable = [
        "url",
        "key"
    ];

    //Generate a unique key for the site at creation
    protected static function boot()
    {
        parent::boot();

        self::creating(function ($model) {
            $model->key = (string) Str::uuid();
        });
    }

    
}
