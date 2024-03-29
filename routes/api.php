<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\BoardController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\CardListController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [LoginController::class, 'login']);

Route::post('/card', [CardController::class, 'store']);
Route::put('/card/{id}', [CardController::class, 'update']);
Route::delete('/card/{id}', [CardController::class, 'destroy']);
Route::get('/card/get-by-list', [CardController::class, 'getByList']);
Route::patch('/card/patch-parent-list/{id}', [CardController::class, 'patchParentList']);

Route::get('/card-list', [CardListController::class, 'index']);
Route::post('/card-list', [CardListController::class, 'store']);
Route::get('/card-list/get-by-board', [CardListController::class, 'getByBoard']);

Route::get('/board', [BoardController::class, 'index']);
Route::post('/board', [BoardController::class, 'store']);
