<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Kas;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

  public function dashboard()
  {
    $user = User::all();
    $task = Task::all();
    $execute_task = Auth::user()->execute_task;
    $kas = Kas::all()->sum("nominal");

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
          "count" => $kas,
        ]
      ]
    ]);
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
    if ($request->user()->role === "member") return $this->throwError([
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
    if ($request->user()->role === "member") return $this->throwError([
      "role" => "Kamu tidak memiliki akses!",
    ]);

    $user = User::find($id);

    if ($request->user()->role === "admin" && $user->role === "superadmin") throw $this->throwError([
      "role" => "Kamu tidak memiliki akses untuk mennghapus superadmin!",
    ]);

    if ($user->id_number === env("AUTHOR_ID")) throw $this->throwError([
      "role" => "Pengguna ini tidak dapat dihapus!",
    ]);

    $user->delete();

    return back()->with("success", ["message" => "Berhasil menghapus pengguna."]);
  }
}
