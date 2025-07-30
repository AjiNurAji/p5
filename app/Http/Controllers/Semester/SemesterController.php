<?php

namespace App\Http\Controllers\Semester;

use App\Helpers\SemesterCacheHelper;
use App\Http\Controllers\Controller;
use App\Models\Semester;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class SemesterController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(): Response
  {
    $semester = SemesterCacheHelper::getAllSemester();

    return Inertia::render("semester/semesters", [
      "data" => $semester
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    // validating user
    $user = $request->user();

    if (!$user) {
      return back()->route("login");
    }

    if (
      $user->role !== "superadmin" &&
      $user->role !== "kosma" &&
      $user->role !== "wakosma" &&
      $user->role !== "sekertaris"
    ) $this->throwError(["message" => "Kamu tidak memiliki akses!"]);

    $request->validate([
      "semester" => "required",
      "is_active" => "required"
    ]);

    // if semester is exist
    $check = Semester::where("semester", $request->input("semester"))->first();

    if ($check) $this->throwError(["message" => "Semester " . $request->input("semester") . " sudah ada."]);

    // if status is active change semester before this inacive
    if ($request->input("is_active")) {
      $active = Semester::where("is_active", $request->input("is_active"))->first();

      if ($active) {
        $active->update([
          "is_active" => false,
        ]);
      };
    };

    $insert = Semester::create([
      "id_semester" => Str::uuid(),
      "semester" => $request->input("semester"),
      "is_active" => $request->input("is_active")
    ]);

    if (!$insert) $this->throwError(["message" => "Gagal menambah semester, silahkan coba lagi!"]);

    return back()->with("success", ["message" => "Berhasil menambah semester."]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }
}
