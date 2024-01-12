<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateBoardRequest;
use App\Models\Board;
use Symfony\Component\HttpFoundation\Response;

class BoardController extends Controller
{
    public function index()
    {
        $boards = Board::all();

        return response()->json([
            'message' => 'Sucessfuly get all boards',
            'data' => $boards,
        ], Response::HTTP_OK);
    }

    public function store(CreateBoardRequest $request)
    {
        $board = $request->validated();

        $boardResponse = Board::create($board);

        return response()->json([
            'message' => 'B45oard created susccesfully',
            'data' => $boardResponse->toArray(),
        ], Response::HTTP_CREATED);
    }
}
