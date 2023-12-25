<?php

namespace Tests\Feature;

use App\Models\Card;
use App\Models\CardList;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CardTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_client_add_new_card_to_an_existing_card_list()
    {
        $cardList = CardList::factory()->create();
        $card = [
            'title' => 'Card title',
            'content' => 'Card content',
            'card_list_id' => $cardList->id
        ];

        $response = $this->postJson('/card', $card);

        $response
            ->assertStatus(201)
            ->assertJsonStructure(['data' => ['id', 'title', 'content', 'card_list_id']]);
        $this->assertDatabaseHas('cards', $card);
    }

    public function test_client_get_cards_by_list()
    {
        $cardList1 = CardList::factory()->create();
        $cardList2 = CardList::factory()->create();
        $this->addCardsToAList($cardList1->id, 2);
        $this->addCardsToAList($cardList2->id, 1);

        $response = $this->getJson("/card/get-by-list?card_list_id={$cardList2->id}");

        $response->assertStatus(200);        
        $cards = $response->json()["data"];
        $this->assertCount(1, $cards);
    }

    public function test_client_delete_a_card()
    {
        $cardList = CardList::factory()->create();
        $card = Card::factory()->create(['card_list_id' => $cardList->id]);

        $response = $this->deleteJson("/card/{$card->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('cards', ['id' => $card->id]);
    }

    private function addCardsToAList(int $listId, $numberOfCards)
    {
        for($i = 1; $i <= $numberOfCards; $i++)
        {
            $card = Card::factory()->create(['card_list_id' => $listId]);
            $this->postJson('/card', [$card]);
        }
    }
}
