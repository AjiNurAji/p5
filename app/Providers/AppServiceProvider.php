<?php

namespace App\Providers;

use App\Models\Bill;
use App\Models\ExecutionTask;
use App\Models\Kas;
use App\Models\Matkul;
use App\Models\Semester;
use App\Models\Task;
use App\Models\User;
use App\Observers\BillObserver;
use App\Observers\ExecutionTaskObserver;
use App\Observers\KasObserver;
use App\Observers\MatkulObserver;
use App\Observers\SemesterObserver;
use App\Observers\TaskObserver;
use App\Observers\UserObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
  /**
   * Register any application services.
   */
  public function register(): void
  {
    //
  }

  /**
   * Bootstrap any application services.
   */
  public function boot(): void
  {
    User::observe(UserObserver::class);
    Semester::observe(SemesterObserver::class);
    Task::observe(TaskObserver::class);
    ExecutionTask::observe(ExecutionTaskObserver::class);
    Kas::observe(KasObserver::class);
    Matkul::observe(MatkulObserver::class);
    Bill::observe(BillObserver::class);
  }
}
