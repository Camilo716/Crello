<?php

namespace App\Http\Controllers;

use App\Models\Board;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class BoardController extends Controller
{
    public function index()
    {
        $boards = Board::all();

        return response()->json([
            'message' => 'Sucessfuly get all boards',
            'data' => $boards],
        Response::HTTP_OK);
    }
}
