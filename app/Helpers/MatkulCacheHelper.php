<?php

namespace App\Helpers;

use App\Models\Matkul;
use Illuminate\Support\Facades\Cache;

class MatkulCacheHelper
{
  public static function getAllMatkul()
  {
    return Cache::rememberForever("all-matkul", function () {
      return Matkul::with("semester")->get();
    });
  }

  public static function getMatkulOnlyActiveSemester()
  {
    $semester = SemesterCacheHelper::getActiveSemester();

    return Cache::rememberForever(
      "matkul-active-semester",
      fn() => Matkul::where("id_semester", $semester?->id_semester)->get()
    );
  }

  public static function forgetMatkul()
  {
    Cache::forget("all-matkul");
    Cache::forget("matkul-active-semester");
  }
}
