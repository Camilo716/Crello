<?php

namespace App\Http\Controllers;

use App\Models\CardList;
use Illuminate\Http\Request;
use App\Http\Requests\CreateCardListRequest;
use Symfony\Component\HttpFoundation\Response;

class CardListController extends Controller
{
    public function index(Request $request)
    {
        $cardLists = CardList::all();
        return response()->json([
            'message' => 'Succesfully get',
            'data' => $cardLists],
        Response::HTTP_OK);
    }

    public function store(CreateCardListRequest $request)
    {
        $cardList = $request->validated();
        
        print_r($cardList);
        $cardListResponse = CardList::create($cardList);

        return response()->json([
            'message' => 'Card list created successfully',
            'data' => $cardListResponse->toArray()],
        Response::HTTP_CREATED);
    }
}
