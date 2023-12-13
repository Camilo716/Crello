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
}
