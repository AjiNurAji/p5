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
        Schema::table('matkuls', function (Blueprint $table) {
          $table->dropColumn("semester");
          $table->foreignUuid("id_semester")->references("id_semester")->on("semesters")->onDelete("set null")->onUpdate("cascade")->nullable();
          $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('matkuls', function (Blueprint $table) {
          $table->dropColumn(["id_semester", "deleted_at"]);
        });
    }
};
