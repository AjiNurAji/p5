<?php

use App\Http\Controllers\Kas\KasController;
use Illuminate\Support\Facades\Route;

Route::middleware("auth")->group(function () {
  Route::get("/kas", [KasController::class, "index"])->name("kas.index");
  Route::get("/kas/create", [KasController::class, "create"])->name("kas.create");
  Route::post("/kas", [KasController::class, "store"])->name("kas.store");
  Route::post("/kas/{id_kas}", [KasController::class, "update"])->name("kas.update");
  Route::delete("/kas/{id_kas}", [KasController::class, "destroy"])->name("kas.destroy");

  Route::get("/kas/report", [KasController::class, "report"])->name("kas.report");
  Route::get("/kas/history", [KasController::class, "history"])->name("kas.history");

  // bill route
  Route::post("/bills/create", [KasController::class, "addBill"])->name("bill.store");
});