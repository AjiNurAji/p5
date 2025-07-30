<?php

namespace App\Observers;

use App\Helpers\SemesterCacheHelper;
use App\Models\Semester;

class SemesterObserver
{
  /**
   * Handle the Semester "created" event.
   */
  public function created(Semester $semester): void
  {
    SemesterCacheHelper::forgetSemester();
  }

  /**
   * Handle the Semester "updated" event.
   */
  public function updated(Semester $semester): void
  {
    SemesterCacheHelper::forgetSemester();
  }

  /**
   * Handle the Semester "deleted" event.
   */
  public function deleted(Semester $semester): void
  {
    SemesterCacheHelper::forgetSemester();
  }

  /**
   * Handle the Semester "restored" event.
   */
  public function restored(Semester $semester): void
  {
    SemesterCacheHelper::forgetSemester();
  }

  /**
   * Handle the Semester "force deleted" event.
   */
  public function forceDeleted(Semester $semester): void
  {
    SemesterCacheHelper::forgetSemester();
  }
}
