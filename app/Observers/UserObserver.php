<?php

namespace App\Observers;

use App\Helpers\KasCacheHelper;
use App\Helpers\UserCacheHelper;
use App\Models\User;

class UserObserver
{
  /**
   * Handle the User "created" event.
   */
  public function created(User $user): void
  {
    UserCacheHelper::forgetUserList();
  }

  /**
   * Handle the User "updated" event.
   */
  public function updated(User $user): void
  {
    UserCacheHelper::forgetUserList();
    KasCacheHelper::forgetKas();
  }

  /**
   * Handle the User "deleted" event.
   */
  public function deleted(User $user): void
  {
    UserCacheHelper::forgetUserList();
  }

  /**
   * Handle the User "restored" event.
   */
  public function restored(User $user): void
  {
    UserCacheHelper::forgetUserList();
  }

  /**
   * Handle the User "force deleted" event.
   */
  public function forceDeleted(User $user): void
  {
    UserCacheHelper::forgetUserList();
  }
}
