<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Kas;
use App\Models\Matkul;
use App\Models\Semester;
use App\Models\Task;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

  public function dashboard()
  {
    $auth = Auth::user();
    $task = Task::all();
    $execute_task = $auth->execute_task;
    $kas = Kas::with("user")->orderBy("payment_on", "DESC")->get();
    $semester = Semester::where("is_active", true)->first();
    $matkul = Matkul::where("id_semester", $semester?->id_semester)->get();

    if (
      $auth->role !== "superadmin" &&
      $auth->role !== "kosma" &&
      $auth->role !== "wakosma"
    ) {
      return Inertia::render("dashboard", [
        "cards" => [
          "mykas" => [
            "title" => "total kas saya",
            "count" => $kas->where("id_number", $auth->id_number)->sum("nominal"),
          ],
          "task_card" => [
            "title" => "total tugas",
            "count" => $task->count(),
          ],
          "execution_task_card" => [
            "title" => "tugas terselesaikan",
            "count" => $execute_task->where("status", "finished")->count(),
          ],
          "kas_card" => [
            "title" => "total kas",
            "count" => $kas->sum("nominal"),
          ],
          "matkul_card" => [
            "title" => "total mata kuliah",
            "count" => $matkul->count(),
          ],
          "semester_card" => [
            "title" => "semester aktif",
            "count" => $semester?->semester,
          ]
        ],
        "payment_kas" => [
          "title" => "pembayaran kas",
          "transaction_per_month" => $kas->whereBetween("payment_on", [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])->count(),
          "data" => $kas->take(5),
        ]
      ]);
    } else {
      $user = User::all();

      return Inertia::render("dashboard", [
        "cards" => [
          "user_card" => [
            "title" => "total mahasiswa",
            "count" => $user->count(),
          ],
          "task_card" => [
            "title" => "total tugas",
            "count" => $task->count(),
          ],
          "execution_task_card" => [
            "title" => "tugas terselesaikan",
            "count" => $execute_task->where("status", "finished")->count(),
          ],
          "kas_card" => [
            "title" => "total kas",
            "count" => $kas->sum("nominal"),
          ],
          "mykas" => [
            "title" => "total kas saya",
            "count" => $kas->where("id_number", $auth->id_number)->sum("nominal"),
          ],
          "matkul_card" => [
            "title" => "total mata kuliah",
            "count" => $matkul->count(),
          ],
          "semester_card" => [
            "title" => "semester aktif",
            "count" => $semester?->semester,
          ]
        ],
        "payment_kas" => [
          "title" => "pembayaran kas",
          "transaction_per_month" => $kas->whereBetween("payment_on", [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])->count(),
          "data" => $kas->take(5),
        ]
      ]);
    }
  }

  /**
   * Display a listing of the resource.
   */
  public function index(): Response
  {
    $users = User::orderBy("name", "ASC")->get();

    return Inertia::render("user/users", [
      "users" => $users,
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(string $id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    if (
      $request->user()->role !== "superadmin" &&
      $request->user()->role !== "kosma" &&
      $request->user()->role !== "wakosma"
    ) return $this->throwError([
      "role" => "Kamu tidak memiliki akses!",
    ]);

    $user = User::find($id);

    if ($request->input("password")) {
      $request->validate([
        "password" => "required|min:8|max:255",
      ]);

      $user->password = Hash::make($request->input("password"));
    }

    if ($request->input("email") && !$user->email_verified_at) {
      $user->sendEmailVerificationNotification();
    }

    $user->save();

    $user->update([
      "name" => $request->input("name"),
      "email" => $request->input("email"),
      "role" => $request->input("role"),
    ]);

    return back()->with("success", ["message" => "Berhasil mengubah data."]);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id, Request $request)
  {
    if (
      $request->user()->role !== "superadmin" &&
      $request->user()->role !== "kosma" &&
      $request->user()->role !== "wakosma"
    ) return $this->throwError([
      "role" => "Kamu tidak memiliki akses!",
    ]);

    $user = User::find($id);

    if (
      ($request->user()->role === "kosma" ||
        $request->user()->role === "wakosma") &&
      $user->role === "superadmin"
    ) throw $this->throwError([
      "role" => "Kamu tidak memiliki akses untuk menghapus superadmin!",
    ]);

    if (
      $request->user()->role === "wakosma" &&
      $user->role === "kosma"
    ) throw $this->throwError([
      "role" => "Kamu tidak memiliki akses untuk menghapus kosma!",
    ]);

    if ($user->id_number === env("AUTHOR_ID")) throw $this->throwError([
      "role" => "Mahasiswa ini tidak dapat dihapus!",
    ]);

    $user->delete();

    return back()->with("success", ["message" => "Berhasil menghapus data."]);
  }
}
