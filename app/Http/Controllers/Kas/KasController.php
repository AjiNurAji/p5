<?php

namespace App\Http\Controllers\Kas;

use App\Http\Controllers\Controller;
use App\Models\Kas;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class KasController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(): Response
  {
    $users = User::all();
    $kas = Kas::with(["user" => fn($u) => $u->withTrashed()])->orderBy("updated_at", "DESC")->get();

    return Inertia::render("kas/kas", [
      "users" => $users,
      "kaslist" => $kas,
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
    // validate request
    $request->validate([
      "id_number" => "required",
      "method" => "required|string",
      "nominal" => "required",
      "payment_on" => "required"
    ]);

    // validate user
    $user = $request->user();

    if (!$user) {
      return redirect()->route("login");
    }

    if (
      $user->role !== "superadmin" &&
      $user->role !== "kosma" &&
      $user->role !== "wakosma" &&
      $user->role !== "bendahara"
    ) return $this->throwError([
      "role" => "Kamu tidak memiliki akses!",
    ]);

    // process transaction
    $data = Kas::create([
      "id_kas" => Str::uuid(),
      "id_number" => $request->input("id_number"),
      "nominal" => $request->input("nominal"),
      "payment_on" => Carbon::parse($request->input("payment_on")),
      "method" => $request->input("method"),
    ]);

    if (!$data) $this->throwError(["message" => "Gagal melakukan transaksi, silahkan coba lagi!"]);

    return back()->with("success", ["message" => "Berhasil melakukan transaksi."]);
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
  public function update(Request $request, string $id_kas)
  {
    // validate request
    $request->validate([
      "id_number" => "required",
      "method" => "required|string",
      "nominal" => "required",
      "payment_on" => "required"
    ]);

    // validate user
    $user = $request->user();

    if (!$user) {
      return redirect()->route("login");
    }

    if (
      $user->role !== "superadmin" &&
      $user->role !== "kosma" &&
      $user->role !== "wakosma" &&
      $user->role !== "bendahara"
    ) return $this->throwError([
      "role" => "Kamu tidak memiliki akses!",
    ]);

    $data = Kas::find($id_kas);

    if (!$data) $this->throwError(["message" => "Data tidak ditemukan!"]);

    $data->update($request->all());

    return back()->with("success", ["message" => "Berhasil mengedit data."]);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id_kas, Request $request)
  {
    // validate user
    $user = $request->user();

    if (!$user) {
      return redirect()->route("login");
    }

    if (
      $user->role !== "superadmin" &&
      $user->role !== "kosma" &&
      $user->role !== "wakosma" &&
      $user->role !== "bendahara"
    ) return $this->throwError([
      "role" => "Kamu tidak memiliki akses!",
    ]);

    $data = Kas::find($id_kas);

    if (!$data) $this->throwError(["message" => "Data tidak ditemukan!"]);

    $data->delete();

    return back()->with("success", ["message" => "Berhasil menghapus data."]);
  }
}
