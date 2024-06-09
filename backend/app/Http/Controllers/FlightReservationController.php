<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\FlightReservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FlightReservationController extends Controller
{
    public function store(Request $request, FlightReservation $flightReservation){
        $data = $request->validate([
            'id' => 'required', 
            'flightNumber' =>'required',
            'from' => 'required',
            'to' => 'required',
            'departure' => 'required',
            'arrival' => 'required',
            'duration' => 'required',
            'price' => 'required',
            'reservation_date' =>'required'
        ]);
        $flightReservation = FlightReservation::create([
            'user_id' => $data['id'],
            'flightNumber' => $data['flightNumber'],
            'from' => $data['from'],
            'to' => $data['to'],
            'departure' => $data['departure'],
            'arrival' => $data['arrival'],
            'duration' => $data['duration'],
            'price' => $data['price'],
            'reservation_date' => $data['reservation_date'],
        ]);
        return response()->json(['message' => 'Congratulations! Your flight ticket has been successfully booked.', 'data' => $flightReservation], 201);

    }

    public function showFlightReservationList()
    {
        $user = Auth::user();

        if ($user) {
            $flightReservations = FlightReservation::where('user_id', $user->id)->get();

            return response()->json([
                'success' => true,
                'data' => $flightReservations
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'User not authenticated'
            ], 401);
        }
    }
}
