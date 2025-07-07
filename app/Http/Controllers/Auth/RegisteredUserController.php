<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
  /**
   * Show the registration page.
   */
  public function create(): Response
  {
    return Inertia::render('auth/register');
  }

  /**
   * Handle an incoming registration request.
   *
   * @throws \Illuminate\Validation\ValidationException
   */
  public function store(Request $request)
  {
    if ($request->user()->role === 'member') return $this->throwError([
      'role' => 'Kamu tidak memiliki akses!',
    ]);

    if ($request->user()->role === 'admin' && $request->input('role') === 'superadmin') throw $this->throwError([
      'role' => 'Kamu tidak memiliki akses untuk menambah superadmin!',
    ]);

    if ($request->input('email')) {
      $request->validate([
        'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
      ]);
    }

    $request->validate([
      'id_number' => 'required|string|max:15',
      'name' => 'required|string|max:255',
      'password' => ['required', Rules\Password::defaults()],
      'role' => ['required', 'string'],
    ]);

    $user = User::create([
      'id_number' => $request->id_number,
      'name' => $request->name,
      'email' => $request->email,
      'password' => Hash::make($request->password),
      'role' => $request->role,
    ]);

    if ($request->input("email")) {
      $user->sendEmailVerificationNotification();
    }

    event(new Registered($user));

    return back()->with('success', ['message' => 'Berhasil menambah data.']);
  }
}
