<?php

namespace Tests\Feature;

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
        $cardList = CardList::factory()->create([
            'title' => 'List title'
        ]);
        $card = [
            'title' => 'Card title',
            'content' => 'Card content',
            'card_list_id' => $cardList->id
        ];

        $response = $this->postJson('/card', $card);

        $response->assertStatus(201)->assertJson($card);
        $this->assertDatabaseHas('cards', $card);
    }
}
