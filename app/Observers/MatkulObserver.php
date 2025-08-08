<?php

namespace App\Observers;

use App\Helpers\MatkulCacheHelper;
use App\Models\Matkul;

class MatkulObserver
{
  /**
   * Handle the Matkul "created" event.
   */
  public function created(Matkul $matkul): void
  {
    MatkulCacheHelper::forgetMatkul();
  }

  /**
   * Handle the Matkul "updated" event.
   */
  public function updated(Matkul $matkul): void
  {
    MatkulCacheHelper::forgetMatkul();
  }

  /**
   * Handle the Matkul "deleted" event.
   */
  public function deleted(Matkul $matkul): void
  {
    MatkulCacheHelper::forgetMatkul();
  }

  /**
   * Handle the Matkul "restored" event.
   */
  public function restored(Matkul $matkul): void
  {
    MatkulCacheHelper::forgetMatkul();
  }

  /**
   * Handle the Matkul "force deleted" event.
   */
  public function forceDeleted(Matkul $matkul): void
  {
    MatkulCacheHelper::forgetMatkul();
  }
}
