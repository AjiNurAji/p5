<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Kas extends Model
{
  protected $table = "kas";

  protected $primaryKey = "id_kas";

  protected $keyType = "string";

  protected $fillable = [
    "id_kas",
    "id_number",
    "nominal",
    "payment_on",
    "method",
  ];

  protected $casts = [
    "payment_on" => "datetime"
  ];

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class, "id_number");
  }
}
