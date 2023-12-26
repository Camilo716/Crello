<?php

use App\Http\Controllers\CardController;
use App\Http\Controllers\CardListController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('board');
});

Route::post('/api/card', [CardController::class,'store']);
Route::put('/api/card/{id}', [CardController::class,'update']);
Route::delete('/api/card/{id}', [CardController::class, 'destroy']);
Route::get('/api/card/get-by-list', [CardController::class,'getByList']);
Route::patch('/api/card/patch-parent-list/{id}', [CardController::class, 'patchParentList']);

Route::get('/api/card-list', [CardListController::class,'index']);
Route::post('/api/card-list', [CardListController::class,'store']);
