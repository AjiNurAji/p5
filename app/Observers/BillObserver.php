<?php

namespace App\Observers;

use App\Helpers\BillCacheHelper;
use App\Models\Bill;

class BillObserver
{
  /**
   * Handle the Bill "created" event.
   */
  public function created(Bill $bill): void
  {
    BillCacheHelper::forgetBill();
  }

  /**
   * Handle the Bill "updated" event.
   */
  public function updated(Bill $bill): void
  {
    BillCacheHelper::forgetBill();
  }

  /**
   * Handle the Bill "deleted" event.
   */
  public function deleted(Bill $bill): void
  {
    BillCacheHelper::forgetBill();
  }

  /**
   * Handle the Bill "restored" event.
   */
  public function restored(Bill $bill): void
  {
    BillCacheHelper::forgetBill();
  }

  /**
   * Handle the Bill "force deleted" event.
   */
  public function forceDeleted(Bill $bill): void
  {
    BillCacheHelper::forgetBill();
  }
}
