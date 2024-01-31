<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request){
        if(User::exists()){
            return response()->json(['message' => "Un seul compte ne peut être créé, celui de l'administrateur !"], 400);
        }
        // $data = $request->validate([
        //     'name' => 'required|max:20',
        //     'email' => 'required|email|unique:users|confirmed',
        //     'password' => 'required|confirmed',
        // ]);

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:20',
            'email' => 'required|email|unique:users|confirmed',
            'password' => 'required|confirmed',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        

        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email; 
        $user->password = bcrypt($request->password);
        $user->save();
        return response()->json(['message' => "L'utilisateur a bien été créé !"]);
    }

    public function login(Request $request){
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        $user = User::where('email', $request->email)->first();

        if(!$user || !Hash::check($request->password, $user->password)){
            return response()->json(['message' => "L'email ou le mot de passe est incorrect !"], 401);
        }

        $token = Hash::make($user->id . '|' . now());

        $user->remember_token = $token;
        $user->save();

        return response()->json(['message' => "Vous êtes connecté.e", 'token' => $token], 200);
    }
}
