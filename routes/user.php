<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
  Route::get('/users', [UserController::class, 'index'])->name('users.index');
  Route::post('/users/{id}', [UserController::class, 'update'])->name('user.update');
  Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('user.delete');

  Route::post('register', [RegisteredUserController::class, 'store'])->name('register');
});
