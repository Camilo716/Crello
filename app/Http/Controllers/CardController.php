<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCardRequest;
use App\Http\Requests\PatchParentListRequest;
use App\Models\Card;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CardController extends Controller
{
    public function store(CreateCardRequest $request)
    {
        $card = $request->validated();

        $cardResponse = Card::create($card);

        return response()->json([
            'message' => 'Card list created successfully',
            'data' => $cardResponse->toArray(),
        ], Response::HTTP_CREATED);
    }

    public function update($id, CreateCardRequest $request)
    {
        $card = Card::findOrFail($id);

        $card->update($request->validated());

        return response()->json([
            'message' => 'Card list created successfully',
            'data' => $card->fresh()->toArray(),
        ], Response::HTTP_OK);
    }

    public function destroy($id)
    {
        $card = Card::findOrFail($id);
        $card->delete();

        return response()->json([
            'message' => 'Card deleted successfully',
        ], Response::HTTP_NO_CONTENT);
    }

    public function patchParentList($id, PatchParentListRequest $request)
    {
        $card = Card::findOrFail($id);

        $card->update($request->validated());

        return response()->json([
            'message' => 'Card list created successfully',
            'data' => $card->refresh()->toArray(),
        ], Response::HTTP_OK);
    }

    public function getByList(Request $request)
    {
        $listId = $request->query('card_list_id');
        $cards = Card::where('card_list_id', '=', $listId)->get();

        return response()->json([
            'message' => 'Successfully get cards by list',
            'data' => $cards,
        ], Response::HTTP_OK);
    }
}
