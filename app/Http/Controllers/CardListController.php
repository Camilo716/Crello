<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCardListRequest;
use App\Models\CardList;
use Illuminate\Http\Request;

class CardListController extends Controller
{
    public function postCardList(CreateCardListRequest $request)
    {
        var_dump($request->all());
        $cardList = $request->validated();

        return CardList::create($cardList);
    }
}
