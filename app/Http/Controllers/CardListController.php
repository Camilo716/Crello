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

        return CardList::create($cardList);
    }

    public function getAllCardLists(Request $request)
    {
        $cards = CardList::all();
        return $cards;
    }
}
