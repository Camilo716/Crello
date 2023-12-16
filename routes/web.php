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

Route::post('/card', [CardController::class,'postCard']);

Route::post('/card-list', [CardListController::class,'postCardList']);
Route::get('/card-list', [CardListController::class,'getAllCardLists']);
