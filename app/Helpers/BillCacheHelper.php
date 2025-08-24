<?php

namespace App\Helpers;

use App\Models\Bill;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;

class BillCacheHelper
{
  public static function getAllBill()
  {
    return Cache::rememberForever("all-bill", function () {
      return Bill::orderBy("date_of_bill", "DESC")->get();
    });
  }

  public static function getActiveBill()
  {
    return Cache::rememberForever("active-bill", function () {
      return Bill::orderBy("date_of_bill", "DESC")->first();
    });
  }

  public static function canAdded()
  {
    return Cache::remember("canAdded", Carbon::now()->addDays(), function () {
      return Bill::whereBetween("date_of_bill", [
        Carbon::now()->startOfWeek(),
        Carbon::now()->endOfWeek()
      ])->exists();
    });
  }

  public static function forgetBill()
  {
    Cache::forget("all-bill");
    Cache::forget("active-bill");
    Cache::forget("canAdded");
  }
}
