<?php

namespace App\Helpers;

use App\Models\User;
use Illuminate\Support\Facades\Cache;

class UserCacheHelper
{
  public static function getUserList()
  {
    return Cache::rememberForever("users", function () {
      return  User::orderBy("name", "ASC")->get();
    });
  }

  public static function getUserWithKas()
  {
    return Cache::rememberForever("user-with-kas", function () {
      return User::with("kas")->orderBy("name", "ASC")->get();
    });
  }

  public static function forgetUserWithKas()
  {
    Cache::forget("user-with-kas");
  }
  
  public static function forgetUserList()
  {
    Cache::forget("user-with-kas");
    Cache::forget("users");
  }
}
