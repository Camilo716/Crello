<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCardRequest;
use App\Models\Card;
use Illuminate\Http\Request;

class CardController extends Controller
{
    public function postCard(CreateCardRequest $request)
    {
        $incomingFields = $request->validated(); 

        return Card::create($incomingFields);
    }

    public function getByList(Request $request)
    {
        $listId = $request->query('card_list_id');
        $cards = Card::where('card_list_id', '=', $listId)->get();

        return response()->json(['message' => 'Succesfully get cards by list', 'data' => $cards], 200);
    }
}
