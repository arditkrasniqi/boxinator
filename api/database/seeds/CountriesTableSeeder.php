<?php

use Illuminate\Database\Seeder;
use App\Country;

class CountriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Country::create([
            'name' => 'Sweden',
            'multiplier' => 1.3
        ]);
        Country::create([
            'name' => 'China',
            'multiplier' => 4
        ]);
        Country::create([
            'name' => 'Brazil',
            'multiplier' => 8.6
        ]);
        Country::create([
            'name' => 'Australia',
            'multiplier' => 7.2
        ]);
    }
}
