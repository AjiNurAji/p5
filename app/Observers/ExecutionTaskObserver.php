<?php

namespace App\Observers;

use App\Helpers\TaskCacheHelper;
use App\Models\ExecutionTask;

class ExecutionTaskObserver
{
  /**
   * Handle the ExecutionTask "created" event.
   */
  public function created(ExecutionTask $executionTask): void
  {
    TaskCacheHelper::forgetTask();
    TaskCacheHelper::forgetExecutionTask($executionTask->id_task);
  }
  
  /**
   * Handle the ExecutionTask "updated" event.
  */
  public function updated(ExecutionTask $executionTask): void
  {
    TaskCacheHelper::forgetTask();
    TaskCacheHelper::forgetExecutionTask($executionTask->id_task);
  }

  /**
   * Handle the ExecutionTask "deleted" event.
   */
  public function deleted(ExecutionTask $executionTask): void
  {
    TaskCacheHelper::forgetTask();
    TaskCacheHelper::forgetExecutionTask($executionTask->id_task);
  }

  /**
   * Handle the ExecutionTask "restored" event.
   */
  public function restored(ExecutionTask $executionTask): void
  {
    TaskCacheHelper::forgetTask();
    TaskCacheHelper::forgetExecutionTask($executionTask->id_task);
  }

  /**
   * Handle the ExecutionTask "force deleted" event.
   */
  public function forceDeleted(ExecutionTask $executionTask): void
  {
    TaskCacheHelper::forgetTask();
    TaskCacheHelper::forgetExecutionTask($executionTask->id_task);
  }
}
