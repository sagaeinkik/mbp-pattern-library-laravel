<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\WordpressSite;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WordpressSite>
 */
class WordpressSiteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

     protected $model = WordpressSite::class;


    public function definition(): array
    {
        return [
            "url" => fake()->url()
        ];
    }
}
