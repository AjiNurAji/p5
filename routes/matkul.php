<?php

use App\Http\Controllers\Matkul\MatkulController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
  Route::get("/matkul", [MatkulController::class, 'index'])->name('matkul.index');
  Route::post("/matkul", [MatkulController::class, 'store'])->name('matkul.store');
});