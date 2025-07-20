<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\GuruController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('siswa', SiswaController::class);
    Route::get('siswa/kelas/{kelas_id}', [SiswaController::class, 'listByKelas']);
    Route::apiResource('kelas', KelasController::class);
    Route::apiResource('guru', GuruController::class);
    Route::get('guru/kelas/{kelas_id}', [GuruController::class, 'listByKelas']);
});
