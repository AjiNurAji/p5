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
    Schema::table('kas', function (Blueprint $table) {
      $table->enum("type", ["income", "expend"])->nullable();
      $table->string("note")->nullable();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('kas', function (Blueprint $table) {
      $table->dropColumn(["type", "note"]);
    });
  }
};
