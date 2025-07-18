<?php

use App\Http\Controllers\Kas\KasController;
use Illuminate\Support\Facades\Route;

Route::middleware("auth")->group(function () {
  Route::get("/kas", [KasController::class, "index"])->name("kas.index");
  Route::post("/kas", [KasController::class, "store"])->name("kas.store");
});