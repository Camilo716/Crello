<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CardController;
use App\Http\Controllers\CardListController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/card', [CardController::class,'store']);
Route::put('/card/{id}', [CardController::class,'update']);
Route::delete('/card/{id}', [CardController::class, 'destroy']);
Route::get('/card/get-by-list', [CardController::class,'getByList']);
Route::patch('/card/patch-parent-list/{id}', [CardController::class, 'patchParentList']);

Route::get('/card-list', [CardListController::class,'index']);
Route::post('/card-list', [CardListController::class,'store']);