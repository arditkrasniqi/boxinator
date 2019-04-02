<?php

namespace App\Http\Controllers;

use App\Http\Resources\CountryCollection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Box;
use App\Country;
use App\Http\Resources\BoxCollection;

class BoxesController extends Controller
{
    public function countries()
    {
        $countries = Country::all();
        return new CountryCollection($countries);
    }

    public function create(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name' => 'required',
            'weight' => 'required|numeric|min:0.5',
            'color' => 'required',
            'destination' => 'required|integer|min:1'
        ]);
        if ($validation->fails()) {
            return response()->json(['errors' => $validation->errors()]);
        }
        $box = new Box;
        $box->name = $request->name;
        $box->weight = $request->weight;
        $box->color = $request->color;
        $box->destination = $request->destination;
        $box->save();

        return response()->json([
            'statusCode' => 201,
            'message' => 'Box created successfully'
        ]);
    }

    public function list(Request $request)
    {
        $totalShippingCost = 0;
        $boxes = Box::join('countries', 'countries.id', '=', 'boxes.destination')
            ->select(
                'boxes.*',
                DB::raw('boxes.weight * countries.multiplier as shipping_cost')
            )
            ->orderBy('created_at', 'desc')
            ->get('desc');

        foreach ($boxes as $box) {
            $totalShippingCost += $box->shipping_cost;
        }
        $totalWeight = Box::sum('weight');
        
        return response()->json([
            'boxes'=>$boxes,
            'totalWeight' => $totalWeight,
            'totalShippingCost' => $totalShippingCost
        ]);

//        return new BoxCollection($boxes);
    }
}
