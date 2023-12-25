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

Route::post('/card', [CardController::class,'store']);
Route::put('/card/{id}', [CardController::class,'update']);
Route::delete('/card/{id}', [CardController::class, 'destroy']);
Route::get('/card/get-by-list', [CardController::class,'getByList']);

Route::get('/card-list', [CardListController::class,'index']);
Route::post('/card-list', [CardListController::class,'store']);
