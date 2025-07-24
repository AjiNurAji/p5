<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Matkul extends Model
{
  use SoftDeletes;

  protected $primaryKey = 'id_matkul';

  protected $keyType = 'string';

  protected $table = 'matkuls';

  protected $fillable = [
    'id_matkul',
    'name',
    'lecturer',
    'id_semester'
  ];

  // matkul func
  public function task(): HasMany
  {
    return $this->hasMany(Task::class, 'id_task');
  }

  public function semester(): BelongsTo
  {
    return $this->belongsTo(Semester::class, "id_semester");
  }
}
