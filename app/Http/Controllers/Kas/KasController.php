<?php

namespace App\Http\Controllers\Kas;

use App\Helpers\KasCacheHelper;
use App\Helpers\UserCacheHelper;
use App\Http\Controllers\Controller;
use App\Models\Kas;
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
    $users = UserCacheHelper::getUserList();
    $kas = KasCacheHelper::getAllKas();

    $income =  $kas->where("type", "income")->sum("nominal");
    $expend = $kas->where("type", "expend")->sum("nominal");
    $total = $income - $expend;

    $cashIncome = $kas->where("method", "cash")->where("type", "income")->sum("nominal");
    $cashExpend = $kas->where("method", "cash")->where("type", "expend")->sum("nominal");
    $cashTotal = $cashIncome - $cashExpend;
    
    $cashlessIncome = $kas->where("method", "cashless")->where("type", "income")->sum("nominal");
    $cashlessExpend = $kas->where("method", "cashless")->where("type", "expend")->sum("nominal");
    $cashlessTotal = $cashlessIncome - $cashlessExpend;

    return Inertia::render("kas/kas", [
      "users" => $users,
      "kaslist" => $kas,
      "cards" => [
        "cash" => [
          "title" => "total tunai",
          "count" => $cashTotal,
        ],
        "cashless" => [
          "title" => "total transfer",
          "count" => $cashlessTotal,
        ],
        "total" => [
          "title" => "total uang kas",
          "count" => $total,
        ],
        "expand" => [
          "title" => "total pengeluaran",
          "count" => $expend,
        ],
      ]
    ]);
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
      "type" => "required|string",
      "note" => "required|string",
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
      $user->role !== "bendahara"
    ) return $this->throwError([
      "role" => "Kamu tidak memiliki akses!",
    ]);

    if ($request->input("type") === "expend") {
      $kas = KasCacheHelper::getAllKas();
      $income =  $kas->where("type", "income")->sum("nominal");
      $expend = $kas->where("type", "expend")->sum("nominal");
      $total = $income - $expend;

      if ($total - $request->input("nominal") <= 0) $this->throwError(["message" => "Saldo kas tidak cukup!"]);
    }

    // process transaction
    $data = Kas::create([
      "id_kas" => Str::uuid(),
      "id_number" => $request->input("id_number"),
      "nominal" => $request->input("nominal"),
      "payment_on" => Carbon::parse($request->input("payment_on")),
      "type" => $request->input("type"),
      "note" => $request->input("note"),
      "method" => $request->input("method"),
    ]);

    if (!$data) $this->throwError(["message" => "Gagal melakukan transaksi, silahkan coba lagi!"]);

    return back()->with("success", ["message" => "Berhasil melakukan transaksi."]);
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
      "type" => "required|string",
      "note" => "required|string",
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

  /**
   * show report kas payment
   */
  public function report(): Response
  {
    $kas = KasCacheHelper::getAllKas();
    $user = Auth::user();
    $kasMe = $kas->where("id_number", $user->id_number);

    return Inertia::render("kas/report/index", [
      "cards" => [
        "week_payment" => [
          "title" => "sampai minggu ke",
          "count" => ($kasMe->sum("nominal") / 5000),
        ],
        "total" => [
          "title" => "total pembayaran",
          "count" => $kasMe->sum("nominal"),
        ],
      ],
      "kaslist" => $kas,
    ]);
  }
}
