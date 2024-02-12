<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PlanetController;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\VerifyToken;

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



// Route::post('/planet', [PlanetController::class, 'store']);``

Route::middleware(['verifytoken'])->group(function () {
    Route::post('/planet', [PlanetController::class, 'store']);

    Route::get('/user', [AuthController::class, 'giveUserInfo']);
    Route::post('/user/edit/name', [AuthController::class, 'changeUserName']);
    Route::post('/user/edit/mail', [AuthController::class, 'changeUserMail']);
    Route::post('/user/edit/password', [AuthController::class, 'changeUserPasswd']);
});

// Route::post('/planet', [PlanetController::class, 'store'])->middleware('verifytoken');

Route::get('/planet/{id}', [PlanetController::class, 'show']);
Route::get('/planets', [PlanetController::class, 'indexForMenu']);

Route::get('/planetImg/{imgName}', [PlanetController::class, 'getImg']);


Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::post('/token', [AuthController::class, 'checkToken']);
