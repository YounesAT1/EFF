<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\FlightReservation;
use Illuminate\Http\Request;

class FlightReservationController extends Controller
{
    public function store(Request $request, FlightReservation $flightReservation){
        $data = $request->validate([
            'id' => 'required', 
            'from' => 'required',
            'to' => 'required',
            'departure' => 'required',
            'arrival' => 'required',
            'duration' => 'required',
            'price' => 'required'
        ]);
        $flightReservation = FlightReservation::create([
            'user_id' => $data['id'],
            'from' => $data['from'],
            'to' => $data['to'],
            'departure' => $data['departure'],
            'arrival' => $data['arrival'],
            'duration' => $data['duration'],
            'price' => $data['price'],
        ]);
        return response()->json(['message' => 'Flight reservation stored successfully', 'data' => $flightReservation], 201);

    }
}
