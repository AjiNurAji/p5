<?php

namespace App\Helpers;

use App\Models\Task;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class TaskCacheHelper
{
  public static function getAllTask()
  {
    return Cache::rememberForever("all-task", function () {
      return Task::all();
    });
  }

  public static function getTaskWithMatkulAndExecution()
  {
    return Cache::rememberForever("task-with-matkul-and-execution", function () {
      $tasks = Task::with([
        "matkul.semester",
        "execution.user" => fn($e) => $e->withTrashed()->orderBy("updated_at", "ASC")
      ])
        ->orderBy("updated_at", "DESC")->get();

      foreach ($tasks as $i => $task) {
        $tasks[$i]->markdown = Storage::disk("public")->get($task->task);
      }

      return $tasks;
    });
  }

  public static function findExecutionTask(string $id_task)
  {
    return Cache::rememberForever(
      "task:$id_task",
      fn() =>
      Task::with([
        "matkul.semester",
        "execution.user" => fn($e) => $e->withTrashed()->orderBy("updated_at", "ASC")
      ])->find($id_task)
    );
  }

  public static function forgetExecutionTask(string $id_task)
  {
    Cache::forget("task:$id_task");
  }

  public static function forgetTask()
  {
    Cache::forget("all-task");
    Cache::forget("task-with-matkul-and-execution");
  }
}
