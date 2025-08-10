<?php

namespace App\Helpers;

use App\Models\Kas;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class KasCacheHelper
{
  public static function getAllKas()
  {
    return Cache::rememberForever("all-kas", function () {
      return Kas::with(["user" => fn($u) => $u->withTrashed()])->orderBy("updated_at", "DESC")->get();
    });
  }
  
  public static function forgetKas()
  {
    Cache::forget("all-kas");
  }
}
