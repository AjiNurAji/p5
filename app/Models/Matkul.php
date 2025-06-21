<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Matkul extends Model
{
  protected $primaryKey = 'id_matkul';

  protected $table = 'matkuls';

  protected $fillable = [
    'id_matkul',
    'name',
    'lecturer',
    'semester'
  ];

  // matkul func
  public function task(): HasMany
  {
    return $this->hasMany(Task::class, 'id_matkul');
  }
}
