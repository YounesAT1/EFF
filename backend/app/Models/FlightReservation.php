<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FlightReservation extends Model
{
    use HasFactory;

    protected $table = 'flight_reservations';
    protected $primaryKey = 'id';
    protected $fillable = ['user_id', 'from', 'to', 'departure', 'arrival', 'duration', 'price'];


    public function user () {
        return $this->belongsTo(User::class);
    }
}
