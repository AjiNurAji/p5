<?php

namespace App\Http\Controllers;

use Error;
use Illuminate\Validation\ValidationException;

abstract class Controller
{
    public function throwError(array $message): Error
    {
      throw ValidationException::withMessages($message);
    }
}
