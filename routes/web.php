<?php

use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
  return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
  Route::get('dashboard', [UserController::class, 'dashboard'])->name('dashboard');
});

Route::get("/custom-email", function () {
  return view("emails.reset-password", [
    "user" => [
      "name" => "Test"
    ],
    "count" => 60,
    "resetUrl" => "https://p5.ajinuraji.my.id/"
  ]);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/user.php';
require __DIR__ . '/task.php';
require __DIR__ . '/matkul.php';
require __DIR__ . '/kas.php';
