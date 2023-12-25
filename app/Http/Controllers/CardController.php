<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCardRequest;
use App\Http\Requests\PatchParentListRequest;
use App\Models\Card;
use Illuminate\Http\Request;

class CardController extends Controller
{
    public function store(CreateCardRequest $request)
    {
        $card = $request->validated();

        $cardResponse = Card::create($card);

        return response()->json([
            'message' => 'Card list created successfully',
            'data' => $cardResponse->toArray()],
        201);
    }
    
    public function update($id, CreateCardRequest $request)
    {
        $card = Card::findOrFail($id);
        
        $card->update($request->validated());
        
        return response()->json([
            'message' => 'Card list created successfully',
            'data' => $card->fresh()->toArray()],
        200);
    }
    
    public function destroy($id) {
        $card = Card::findOrFail($id);
        $card->delete();
        
        return response()->json([
            'message' => 'Card deleted successfully'],
            204);
        }
        
    public function patchParentList($id, PatchParentListRequest $request) {
        $card = Card::findOrFail($id);

        $card->update($request->validated());

        return response()->json([
            'message' => 'Card list created successfully',
            'data' => $card->refresh()->toArray()],
        200);
    }
        
    public function getByList(Request $request)
    {
        $listId = $request->query('card_list_id');
        $cards = Card::where('card_list_id', '=', $listId)->get();

        return response()->json([
            'message' => 'Successfully get cards by list',
            'data' => $cards],
        200);
    }
}
