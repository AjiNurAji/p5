<?php

use App\Http\Controllers\Task\ExecutionTaskController;
use App\Http\Controllers\Task\TaskController;
use Illuminate\Support\Facades\Route;

Route::middleware("auth")->group(function () {
  Route::get("/tasks", [TaskController::class, "index"])->name("tasks.index");
  Route::post("/tasks", [TaskController::class, "store"])->name("tasks.store");
  Route::post("/tasks/{id_task}", [TaskController::class, "update"])->name("tasks.update");

  // execution task
  Route::post("/execution-task", [ExecutionTaskController::class, "store"])->name("execution.store");
  Route::post("/execution-task/{id_task}/{id_number}", [ExecutionTaskController::class, "update"])->name("execution.update");
});