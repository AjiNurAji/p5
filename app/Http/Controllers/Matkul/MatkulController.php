<?php

namespace App\Http\Controllers\Matkul;

use App\Helpers\MatkulCacheHelper;
use App\Helpers\SemesterCacheHelper;
use App\Http\Controllers\Controller;
use App\Models\Matkul;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class MatkulController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(): Response
  {

    $matkuls = MatkulCacheHelper::getAllMatkul();
    $semester = SemesterCacheHelper::getActiveSemester();

    return Inertia::render('matkul/matkuls', [
      'matkuls' => $matkuls,
      'semester' => $semester,
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    // validate user
    $user = Auth::user();

    if (!$user) {
      return redirect()->route('login');
    }

    if (
      $user->role !== "superadmin" &&
      $user->role !== "kosma" &&
      $user->role !== "wakosma" &&
      $user->role !== "sekertaris"
    ) {
      return $this->throwError([
        'role' => 'Kamu tidak memiliki akses!',
      ]);
    }

    $request->validate([
      'name' => 'required|string',
      'lecturer' => 'required|string',
      'id_semester' => 'required|string',
    ]);

    Matkul::create([
      'id_matkul' => Str::uuid(),
      'name' => $request->name,
      'lecturer' => $request->lecturer,
      'id_semester' => $request->id_semester,
    ]);

    return back()->with('success', ['message' => 'Data berhasil ditambahkan']);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id_matkul)
  {

    // validate request
    $request->validate([
      'name' => 'required|string',
      'lecturer' => 'required|string',
      'id_semester' => 'required'
    ]);

    // validate user
    $user = $request->user();

    if (!$user) {
      return redirect()->route('login');
    }

    if (
      $user->role !== "superadmin" &&
      $user->role !== "kosma" &&
      $user->role !== "wakosma" &&
      $user->role !== "sekertaris"
    ) return $this->throwError([
      'role' => 'Kamu tidak memiliki akses!',
    ]);

    $matkul = Matkul::find($id_matkul);

    if (!$matkul) return $this->throwError([
      'message' => 'Data tidak ditemukan!',
    ]);

    $matkul->update($request->all());

    return back()->with('success', [
      'message' => 'Data berhasil diperbarui!'
    ]);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id_matkul)
  {
    $user = Auth::user();

    if (!$user) {
      return redirect()->route('login');
    }

    if (
      $user->role !== "superadmin" &&
      $user->role !== "kosma" &&
      $user->role !== "wakosma" &&
      $user->role !== "sekertaris"
    ) return $this->throwError([
      'role' => 'Kamu tidak memiliki akses!',
    ]);

    $matkul = Matkul::find($id_matkul);

    if (!$matkul) return $this->throwError([
      'message' => 'Data tidak ditemukan!',
    ]);

    $matkul->delete();

    return back()->with('success', [
      'message' => 'Data berhasil dihapus!'
    ]);
  }
}
