<?php

namespace App\Http\Controllers;

use App\Models\Card;
use Illuminate\Http\Request;

class CardController extends Controller
{
    public function postCard(Request $request)
    {
        $incomingFields = $request->validate([
            "tittle"=> "required",
            "content" => "required",
        ]);

        return Card::create($incomingFields);
    }
}
