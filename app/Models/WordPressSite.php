<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;



class WordpressSite extends Model
{
    protected $fillable = [
        "url", 
        "key"
    ];

    //Generate a unique key for the site at creation
    protected static function boot() {
        parent::boot(); 

        self::creating(function ($model) {
            $model->key = (string) Str::uuid();
        });
    }
}
