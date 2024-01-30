<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PlanetController;
use App\Http\Controllers\AuthController;

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



// Route::post('/planet', [PlanetController::class, 'store']);

Route::post('/planet', [PlanetController::class, 'store']);

Route::get('/planet/{id}', [PlanetController::class, 'show']);
Route::get('/planets', [PlanetController::class, 'indexForMenu']);

Route::get('/planetImg/{imgName}', [PlanetController::class, 'getImg']);


Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);
