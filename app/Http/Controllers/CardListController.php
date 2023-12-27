<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCardListRequest;
use App\Models\CardList;
use Illuminate\Http\Request;

class CardListController extends Controller
{
    public function index(Request $request)
    {
        $cardLists = CardList::all();
        return response()->json([
            'message' => 'Succesfully get',
            'data' => $cardLists],
        200);
    }

    public function store(CreateCardListRequest $request)
    {
        $cardList = $request->validated();
        
        print_r($cardList);
        $cardListResponse = CardList::create($cardList);

        return response()->json([
            'message' => 'Card list created successfully',
            'data' => $cardListResponse->toArray()],
        201);
    }
}
