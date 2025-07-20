<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use Illuminate\Http\Request;

class GuruController extends Controller
{
    public function index()
    {
        return Guru::with('kelas')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'kelas_id' => 'required|exists:kelas,id',
        ]);
        $guru = Guru::create($validated);
        return response()->json($guru, 201);
    }

    public function show($id)
    {
        return Guru::with('kelas')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'kelas_id' => 'required|exists:kelas,id',
        ]);
        $guru = Guru::findOrFail($id);
        $guru->update($validated);
        return response()->json($guru);
    }

    public function destroy($id)
    {
        $guru = Guru::findOrFail($id);
        $guru->delete();
        return response()->json(['message' => 'Guru dihapus']);
    }

    public function listByKelas($kelas_id)
    {
        return Guru::where('kelas_id', $kelas_id)->with('kelas')->get();
    }
}
