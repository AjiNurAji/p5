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

  public static function forgetUserList()
  {
    Cache::forget("users");
  }
}
