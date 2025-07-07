<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('execution_tasks', function (Blueprint $table) {
      $table->uuid('id_execution')->primary()->unique();
      $table->string("id_number", 10)->index();
      $table->foreign("id_number")->references("id_number")->on("users");
      $table->foreignUuid('id_task')->index();
      $table->enum('status', ['pending', 'progress', 'finished']);
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('execution_tasks');
  }
};
