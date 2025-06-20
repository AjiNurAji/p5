<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
  Route::get('/users', [UserController::class, 'index'])->name('users.index');
  Route::post('/users/{id}', [UserController::class, 'edit'])->name('user.edit');

  Route::post('register', [RegisteredUserController::class, 'store'])->name('register');
});