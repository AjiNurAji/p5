<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
  
  public function dashboard()
    {
      $user = User::all();

      return Inertia::render('dashboard', [
        'user_card' => [
          'title' => 'total pengguna',
          'count' => $user->count(),
        ]
      ]);
    }

  /**
   * Display a listing of the resource.
   */
  public function index(): Response
  {
    $users = User::orderBy('name', 'ASC')->get();

    return Inertia::render('user/users', [
      'users' => $users,
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
  public function edit(Request $request, string $id)
  {
    if ($request->user()->role === 'member') return $this->throwError([
      'role' => 'Kamu tidak memiliki akses!',
    ]);

    $user = User::find($id);

    if ($request->input('password')) {
      $request->validate([
        'password' => 'required|min:8|max:255',
      ]);

      $user->password = Hash::make($request->input('password'));
    }

    $user->save();

    $user->update([
      'name' => $request->input('name'),
      'email' => $request->input('email'),
      'role' => $request->input('role'),
    ]);

    return back()->with('success', ['message' => 'Berhasil mengubah data.']);
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
