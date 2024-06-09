<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::table('flight_reservations', function (Blueprint $table) {
        $table->string('flightNumber')->after('id');
    });
}

public function down()
{
    Schema::table('flight_reservations', function (Blueprint $table) {
        $table->dropColumn('flightNumber');
    });
}

};