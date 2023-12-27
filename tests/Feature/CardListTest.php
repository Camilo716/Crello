<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Board;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CardListTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    private $cardListBaseEnpoint = '/api/card-list';

    public function test_client_post_new_card_list_to_an_existing_board()
    {
        $board = Board::factory()->create();
        $cardList = [
            'title' => 'DumpTitle',
            'board_id' => $board->id,
        ];

        $response = $this->postJson($this->cardListBaseEnpoint, $cardList);

        $response->assertStatus(201)->assertJsonStructure(['data' => ['id', 'title']]);
        $this->assertDatabaseHas('card_lists', $cardList);
    }

    public function test_client_get_all_card_lists()
    {
        $response = $this->getJson($this->cardListBaseEnpoint);
        $response->assertStatus(200);
        $response->assertJson(['data' => []]);
    }
}
