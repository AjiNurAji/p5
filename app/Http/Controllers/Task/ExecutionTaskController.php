<?php

namespace App\Http\Controllers\Task;

use App\Helpers\TaskCacheHelper;
use App\Http\Controllers\Controller;
use App\Models\ExecutionTask;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ExecutionTaskController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(string $id_task): Response
  {
    $tasks = TaskCacheHelper::findExecutionTask($id_task);

    return Inertia::render("tasks/executions/index", [
      "tasks" => $tasks
    ]);
  }
  
  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    // validate user
    $user = $request->user();

    if (!$user) {
      redirect()->route("login");
      return $this->throwError(["message" => "Anda belum login!"]);
    };

    // validate request
    $request->validate([
      "id_task" => "required|string",
      "id_number" => "required|string",
    ]);

    // find execution task
    $execution = ExecutionTask::where([
      ["id_task", $request->input("id_task")],
      ["id_number", $request->input("id_number")]
    ])->exists();

    if ($execution) $this->throwError(["message" => "Tugas sedang dikerjakan atau telah diselesaikan!"]);

    // create execution
    ExecutionTask::create([
      "id_execution" => Str::uuid(),
      "id_task" => $request->input("id_task"),
      "id_number" => $request->input("id_number"),
      "status" => "progress",
    ]);

    return back()->with("success", ["message" => "Berhasil memproses data."]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id_task, string $id_number)
  {
    // validate user
    $user = $request->user();

    if (!$user) {
      redirect()->route("login");
      return $this->throwError(["message" => "Anda belum login!"]);
    };

    // find execution task
    $execution = ExecutionTask::where([
      ["id_task", $id_task],
      ["id_number", $id_number]
    ])->first();

    // if not found
    if (!$execution) $this->throwError(["message" => "Data tidak ditemukan!"]);

    if ($execution->status === "finished") $this->throwError(["message" => "Tugas telah diselesaikan!"]);

    $execution->update([
      "status" => "finished",
    ]);

    return back()->with("success", ["message" => "Berhasil menyelesaikan tugas."]);
  }
}
