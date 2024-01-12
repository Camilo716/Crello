<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCardListRequest;
use App\Models\CardList;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CardListController extends Controller
{
    public function index()
    {
        $cardLists = CardList::all();
        return response()->json([
            'message' => 'Succesfully get',
            'data' => $cardLists,
        ], Response::HTTP_OK);
    }

    public function store(CreateCardListRequest $request)
    {
        $cardList = $request->validated();

        $cardListResponse = CardList::create($cardList);

        return response()->json([
            'message' => 'Card list created successfully',
            'data' => $cardListResponse->toArray(),
        ], Response::HTTP_CREATED);
    }

    public function getByBoard(Request $request)
    {
        $boardId = $request->query('board_id');

        $lists = CardList::where('board_id', '=', $boardId)->get();

        return response()->json([
            'message' => 'Successfully get lists by board',
            'data' => $lists,
        ], Response::HTTP_OK);
    }
}
