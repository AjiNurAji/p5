<?php

namespace App\Observers;

use App\Helpers\TaskCacheHelper;
use App\Models\Task;

class TaskObserver
{
  /**
   * Handle the Task "created" event.
   */
  public function created(Task $task): void
  {
    TaskCacheHelper::forgetTask();
  }

  /**
   * Handle the Task "updated" event.
   */
  public function updated(Task $task): void
  {
    TaskCacheHelper::forgetTask();
  }

  /**
   * Handle the Task "deleted" event.
   */
  public function deleted(Task $task): void
  {
    TaskCacheHelper::forgetTask();
  }

  /**
   * Handle the Task "restored" event.
   */
  public function restored(Task $task): void
  {
    TaskCacheHelper::forgetTask();
  }

  /**
   * Handle the Task "force deleted" event.
   */
  public function forceDeleted(Task $task): void
  {
    TaskCacheHelper::forgetTask();
  }
}
