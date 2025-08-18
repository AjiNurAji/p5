<?php

namespace App\Http\Controllers\Task;

use App\Helpers\MatkulCacheHelper;
use App\Helpers\TaskCacheHelper;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Task;
use Inertia\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

class TaskController extends Controller
{

  /**
   * Display a listing of the resource.
   */
  public function index(): Response
  {
    $tasks = TaskCacheHelper::getTaskWithMatkulAndExecution();
    $matkuls = MatkulCacheHelper::getAllMatkul();


    return Inertia::render("tasks/tasks", [
      "tasks" => $tasks,
      "matkuls" => $matkuls,
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

    if (
      $user->role !== "superadmin" &&
      $user->role !== "kosma" &&
      $user->role !== "wakosma" &&
      $user->role !== "sekertaris"
    ) return $this->throwError(["message" => "Anda tidak memiliki akses!"]);

    // validate request
    $request->validate([
      "deadline" => "required",
      "id_matkul" => "required|string",
      "markdown" => "required",
    ]);

    // save markdown
    $path = "//tasks//".$request->input("id_matkul")."//".uniqid().".md";
    Storage::disk("public")->put($path, $request->input("markdown"));

    // create task
    Task::create([
      "id_task" => Str::uuid(),
      "task" => $path,
      "deadline" => Carbon::parse($request->deadline),
      "id_matkul" => $request->id_matkul,
    ]);

    return back()->with("success", ["message" => "Berhasil menambahkan tugas."]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id_task)
  {
    // validate user
    $user = $request->user();

    if (!$user) {
      redirect()->route("login");
      return $this->throwError(["message" => "Anda belum login!"]);
    };

    if ($user->role === "member") return $this->throwError(["message" => "Anda tidak memiliki akses!"]);

    // validate request
    $request->validate([
      "task" => "required|string|max:255",
      "deadline" => "required",
      "id_matkul" => "required|string",
    ]);

    // find task
    $task = Task::find($id_task);

    if (!$task) return $this->throwError(["message" => "Tugas tidak ditemukan."]);

    $task->update([
      "task" => $request->input("task"),
      "id_matkul" => $request->input("id_matkul"),
      "deadline" => Carbon::parse($request->input("deadline")),
    ]);

    return back()->with("success", ["message" => "Berhasil mengubah tugas."]);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Request $request, string $id_task)
  {
    // validate user
    $user = $request->user();

    if (!$user) {
      redirect()->route("login");
      return $this->throwError(["message" => "Anda belum login!"]);
    };

    if (
      $user->role !== "superadmin" &&
      $user->role !== "kosma" &&
      $user->role !== "wakosma" &&
      $user->role !== "sekertaris"
    ) return $this->throwError(["message" => "Anda tidak memiliki akses!"]);

    $task = Task::find($id_task);

    if (!$task) return $this->throwError([
      'message' => 'Tugas tidak ditemukan!',
    ]);

    $task->delete();

    return back()->with('success', [
      'message' => 'Berhasil menghapus tugas.'
    ]);
  }
}
