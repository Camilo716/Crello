<?php

namespace Tests\Feature;

use App\Models\CardList;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CardTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_client_add_new_card_to_an_existing_card_list()
    {
        $card = [
            'title' => 'DumpTittle',
            'content' => 'DumpDescription'
        ];

        $response = $this->postJson('/card', $card);

        $response->assertStatus(201)->assertJson($card);
        $this->assertDatabaseHas('cards', $card);
    }
}
