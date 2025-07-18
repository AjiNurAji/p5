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
    Schema::create('kas', function (Blueprint $table) {
      $table->uuid("id_kas")->primary();
      $table->string("id_number", 10)->nullable();
      $table->foreign("id_number")->references("id_number")->on("users")->onDelete("set null")->onUpdate("cascade");
      $table->bigInteger("nominal");
      $table->timestamp("payment_on");
      $table->enum("method", ["cash", "cashless"]);
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('kas');
  }
};
