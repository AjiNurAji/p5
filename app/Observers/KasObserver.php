<?php

namespace App\Observers;

use App\Helpers\KasCacheHelper;
use App\Models\Kas;

class KasObserver
{
  /**
   * Handle the Kas "created" event.
   */
  public function created(Kas $kas): void
  {
    KasCacheHelper::forgetKas();
  }

  /**
   * Handle the Kas "updated" event.
   */
  public function updated(Kas $kas): void
  {
    KasCacheHelper::forgetKas();
  }

  /**
   * Handle the Kas "deleted" event.
   */
  public function deleted(Kas $kas): void
  {
    KasCacheHelper::forgetKas();
  }

  /**
   * Handle the Kas "restored" event.
   */
  public function restored(Kas $kas): void
  {
    KasCacheHelper::forgetKas();
  }

  /**
   * Handle the Kas "force deleted" event.
   */
  public function forceDeleted(Kas $kas): void
  {
    KasCacheHelper::forgetKas();
  }
}
