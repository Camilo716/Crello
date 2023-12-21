<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCardListRequest;
use App\Models\CardList;
use Illuminate\Http\Request;

class CardListController extends Controller
{
    public function postCardList(CreateCardListRequest $request)
    {
        $cardList = $request->validated();

        $cardResponse = CardList::create($cardList);

        $responseData = $cardResponse->makeVisible(['id', 'title'])->toArray();
        return response()->json(['message' => 'Card list created successfully', 'data' => $responseData], 201);
    }

    public function getAllCardLists(Request $request)
    {
        $cardLists = CardList::all();
        return response()->json(['message' => 'Succesfully get', 'data' => $cardLists], 200);
    }
}
