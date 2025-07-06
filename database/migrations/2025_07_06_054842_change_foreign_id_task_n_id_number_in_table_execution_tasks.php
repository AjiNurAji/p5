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
        Schema::table('execution_tasks', function (Blueprint $table) {
            $table->dropColumn(['id_task', 'id_number']);
            $table->foreignUuid('id_task')->index();
            $table->foreignUuid('id_number')->index();
          });
        }
        
        /**
         * Reverse the migrations.
         */
        public function down(): void
        {
          Schema::table('execution_tasks', function (Blueprint $table) {
            $table->dropColumn(['id_task', 'id_number']);
        });
    }
};
