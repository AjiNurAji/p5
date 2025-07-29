<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\AvatarRequest;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Carbon\Carbon;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
  /**
   * Show the user"s profile settings page.
   */
  public function edit(Request $request): Response
  {
    return Inertia::render("settings/profile", [
      "mustVerifyEmail" => $request->user()->hasVerifiedEmail(),
      "status" => $request->session()->get("status"),
    ]);
  }

  /**
   * Update the user"s profile settings.
   */
  public function update(ProfileUpdateRequest $request): RedirectResponse
  {

    $request->user()->fill($request->validated());

    if ($request->user()->isDirty("email")) {
      $request->user()->email_verified_at = null;
    }

    $request->user()->save();

    return to_route("profile.edit");
  }

  /**
   * Delete the user"s account.
   */
  public function destroy(Request $request): RedirectResponse
  {
    $request->validate([
      "password" => ["required", "current_password"],
    ]);

    $user = $request->user();

    if ($user->role === "superadmin" && $user->id_number === env("AUTHOR_ID")) {
      $this->throwError(["message" => "Pengguna ini tidak dapat dihapus!"]);
    }

    Auth::logout();

    $user->delete();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return redirect("/");
  }

  public function updateAvatar(AvatarRequest $request)
  {
    // get auth
    $user = $request->user();

    // validation image
    if ($request->hasFile("avatar")) {
      $avatar = $request->file("avatar");

      $filename = $user->id_number . "-" . Carbon::now()->timestamp . "." . $avatar->getClientOriginalExtension();

      $path = "//storage/" . $avatar->storeAs("avatars", $filename, 'public');

      $user->avatar = $path;

      $user->save();

      return back()->with("success", ["message" => "Berhasil menyimpan poto profil."]);
    }

    return $this->throwError(["message" => "Tolong masukkan gamber!"]);
  }
}
