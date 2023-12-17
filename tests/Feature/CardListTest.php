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

        $response->assertStatus(201)->assertJson(['data' => $cardList]);
        $this->assertDatabaseHas('card_lists', $cardList);
    }

    public function test_client_get_all_card_lists()
    {
        $response = $this->getJson('/card-list');
        $response->assertStatus(200);
        $response->assertJson(['data'=> []]);
    }
}
