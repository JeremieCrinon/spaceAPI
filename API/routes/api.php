<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PlanetController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::post('/planet', [PlanetController::class, 'store']);

Route::post('/planet', [PlanetController::class, 'store']);

Route::get('/planet/{id}', [PlanetController::class, 'show']);
Route::get('/planets', [PlanetController::class, 'indexForMenu']);

Route::get('/planetImg/{imgName}', [PlanetController::class, 'getImg']);
