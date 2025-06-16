<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExecutionTask extends Model
{
    protected $primaryKey = 'id_execution';

    protected $table = 'tasks';

    protected $fillable = [
      'id_execution',
      'id_task',
      'id_matkul',
      'deadline'
    ];

    // matkul func
    public function task(): BelongsTo {
      return $this->belongsTo(Task::class, 'id_task');
    }
}
