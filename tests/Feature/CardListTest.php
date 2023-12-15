<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CardListTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_client_post_new_card_list()
    {
        $cardList = [
            'title' => 'DumpTitle'
        ];

        $response = $this->postJson('/card-list', $cardList);

        $response->assertStatus(201)->assertJson($cardList);
        $this->assertDatabaseHas('card_lists', $cardList);
    }
}
