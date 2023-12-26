<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CardListTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    private $cardListBaseEnpoint = '/api/card-list';

    public function test_client_post_new_card_list()
    {
        $cardList = [
            'title' => 'DumpTitle'
        ];

        $response = $this->postJson($this->cardListBaseEnpoint, $cardList);

        $response->assertStatus(201)->assertJsonStructure(['data' => ['id', 'title']]);
        $this->assertDatabaseHas('card_lists', $cardList);
    }

    public function test_client_get_all_card_lists()
    {
        $response = $this->getJson($this->cardListBaseEnpoint);
        $response->assertStatus(200);
        $response->assertJson(['data'=> []]);
    }
}
