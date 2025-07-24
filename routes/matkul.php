<?php

use App\Http\Controllers\Matkul\MatkulController;
use App\Http\Controllers\Semester\SemesterController;
use Illuminate\Support\Facades\Route;

Route::middleware(["auth"])->group(function () {
  Route::get("/matkul", [MatkulController::class, "index"])->name("matkul.index");
  Route::post("/matkul", [MatkulController::class, "store"])->name("matkul.store");

  Route::post("/matkul/{id_matkul}", [MatkulController::class, "update"])->name("matkul.update");
  Route::delete("/matkul/{id_matkul}", [MatkulController::class, "destroy"])->name("matkul.destroy");

  Route::get("/semester", [SemesterController::class, "index"])->name("semester.index");
  Route::post("/semester", [SemesterController::class, "store"])->name("semester.store");
});