<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    protected function handleUploadPicture($file)
    {
        $folder = 'pictures';
        $token = uniqid();
        $pictureSrc = $folder . '/' . $token . '-' . $file->getClientOriginalName();
        $file->move(public_path($folder), $token . '-' . $file->getClientOriginalName());

        return $pictureSrc;
    }

    public function updateUserDetails(Request $request, User $user)
    {
        $validatedData = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'password' => 'nullable|string|min:8|confirmed',
            'picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        try {
            $userData = [
                'firstName' => $validatedData['firstName'],
                'lastName' => $validatedData['lastName'],
                'email' => $validatedData['email'],
                'password' => isset($validatedData['password']) ? Hash::make($validatedData['password']) : $user->password,
            ];

            if ($request->hasFile('picture')) {
                $userData['picture'] = $this->handleUploadPicture($request->file('picture'));
            }

            $user->update($userData);
            return response()->json([
                'status' => 200,
                'message' => 'User details updated successfully',
                'user' => $user->fresh(), 
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Something went wrong',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    
}
