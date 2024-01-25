<?php

namespace App\Http\Controllers;

use App\Models\Planet;
use Illuminate\Http\Request;

class PlanetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'fr_name' => 'required|max:20',
            'en_name' => 'required|max:20',
            'fr_description' => 'required|max:500',
            'en_description' => 'required|max:500',
            'distance' => 'required|max:20',
            'time' => 'required|max:20',
            'image' => 'required|image',
        ]);
        $planet = new Planet;
        if ($request->hasFile('image')) {
            $planet->image = $request->file('image')->store('img', 'public');
        } else {
            return response()->json(['message' => 'Image not send'], 400);
        }
        $planet->fr_name = $request->fr_name;
        $planet->en_name = $request->en_name;
        $planet->fr_description = $request->fr_description;
        $planet->en_description = $request->en_description;
        $planet->distance = $request->distance;
        $planet->time = $request->time;
        $planet->image = $request->image->store('img', 'public');
        // $planet->image = "vvv";
        $planet->save();
        return response()->json(['message' => "La planet a bien été créée !"]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Planet $planet)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Planet $planet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Planet $planet)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Planet $planet)
    {
        //
    }
}
