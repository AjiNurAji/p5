<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExecutionTask extends Model
{
    protected $primaryKey = 'id_execution';

    protected $table = 'execution_tasks';

    protected $keyType = 'string';

    protected $fillable = [
      'id_execution',
      'id_task',
      'id_number',
      'status'
    ];

    // task func
    public function task(): BelongsTo {
      return $this->belongsTo(Task::class, 'id_task');
    }

    // user func
    public function user(): BelongsTo {
      return $this->belongsTo(User::class, 'id_number');
    }
}
