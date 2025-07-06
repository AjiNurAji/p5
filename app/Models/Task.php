<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Task extends Model
{
  protected $primaryKey = 'id_task';

  protected $table = 'tasks';

  protected $keyType = 'string';

  protected $fillable = [
    'id_task',
    'task',
    'id_matkul',
    'deadline'
  ];

  protected $casts = [
    'deadline' => 'datetime'
  ];

  // matkul func
  public function matkul(): BelongsTo
  {
    return $this->belongsTo(Matkul::class, 'id_matkul');
  }

  // excution func
  public function execution(): HasMany
  {
    return $this->hasMany(ExecutionTask::class, 'id_task');
  }
}
