<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Semester extends Model
{
  use SoftDeletes;

  protected $primaryKey = "id_semester";

  protected $keyType = "string";

  protected $fillable = [
    "id_semester",
    "semester",
    "is_active",
  ];

  public function matkuls(): HasMany
  {
    return $this->hasMany(Matkul::class, "id_semester");
  }
}
