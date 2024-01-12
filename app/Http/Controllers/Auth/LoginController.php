<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $this->validateLogin($request);

        $isAuthenticated = Auth::attempt($request->only('email', 'password'));
        if ($isAuthenticated) {
            return response()->json([
                'message' => 'successfully authenticated',
                'data' => ['token' => $request->user()->createToken('test_token_name')->plainTextToken],
            ], Response::HTTP_OK);
        }
    }

    public function validateLogin(Request $request)
    {
        return $request->validate([
            'email' => 'required | email',
            'password' => 'required',
            'token_name' => 'required',
        ]);
    }
}
