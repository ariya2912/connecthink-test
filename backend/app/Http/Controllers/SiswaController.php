<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use Illuminate\Http\Request;

class SiswaController extends Controller
{
    public function index()
    {
        return Siswa::with('kelas')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'kelas_id' => 'required|exists:kelas,id',
        ]);
        $siswa = Siswa::create($validated);
        return response()->json($siswa, 201);
    }

    public function show($id)
    {
        return Siswa::with('kelas')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'kelas_id' => 'required|exists:kelas,id',
        ]);
        $siswa = Siswa::findOrFail($id);
        $siswa->update($validated);
        return response()->json($siswa);
    }

    public function destroy($id)
    {
        $siswa = Siswa::findOrFail($id);
        $siswa->delete();
        return response()->json(['message' => 'Siswa dihapus']);
    }

    public function listByKelas($kelas_id)
    {
        return Siswa::where('kelas_id', $kelas_id)->with('kelas')->get();
    }
}
