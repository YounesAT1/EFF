<?php

use App\Http\Controllers\FlightReservationController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware('auth')->prefix('/user')->group(function () {
    Route::match(['put', 'post'], '/{user}', [UserController::class, 'updateUserDetails']);

});

Route::post('/flight-reservation', [FlightReservationController::class, 'store']);
Route::get('/reservation', [FlightReservationController::class, 'showFlightReservationList']);
