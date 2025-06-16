<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Task extends Model
{
  protected $primaryKey = 'id_task';

  protected $table = 'tasks';

  protected $fillable = [
    'id_task',
    'task',
    'id_matkul',
    'deadline'
  ];

  // matkul func
  public function matkul(): HasMany
  {
    return $this->hasMany(Matkul::class, 'id_matkul');
  }
}
