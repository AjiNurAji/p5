<?php

use App\Http\Controllers\Task\TaskController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
  Route::get('/tasks', [TaskController::class, 'index'])->name('tasks.index');
});