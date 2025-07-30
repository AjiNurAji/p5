<?php

namespace App\Helpers;

use App\Models\Semester;
use Illuminate\Support\Facades\Cache;

class SemesterCacheHelper
{
  public static function getAllSemester()
  {
    return Cache::rememberForever("all-semester", function () {
      return Semester::orderBy("created_at", "DESC")->get();
    });
  }

  public static function getActiveSemester()
  {
    return Cache::rememberForever("active-semester", function () {
      return Semester::where("is_active", true)->first();
    });
  }
  
  public static function forgetSemester()
  {
    Cache::forget("active-semester");
    Cache::forget("all-semester");
  }
}