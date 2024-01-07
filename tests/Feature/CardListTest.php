<?php

namespace Tests\Feature;

use App\Models\Board;
use App\Models\CardList;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

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
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id', 'title',
                ],
            ],
        ]);
    }

    public function test_client_get_lists_by_board()
    {
        $board1 = Board::factory()->create();
        $board2 = Board::factory()->create();
        $this->addListsToABoard($board1->id, 3);
        $this->addListsToABoard($board2->id, 1);

        $response = $this->getJson("$this->cardListBaseEnpoint/get-by-board?board_id={$board1->id}");

        $response->assertStatus(200);
        $lists = $response->json()['data'];
        $this->assertCount(3, $lists);
    }

    private function addListsToABoard(int $boardId, $numberOfLists)
    {
        for ($i = 1; $i <= $numberOfLists; $i++) {
            $list = CardList::factory()->create(['board_id' => $boardId]);
            $this->postJson("$this->cardListBaseEnpoint", [$list]);
        }
    }
}
