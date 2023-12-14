<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CardListTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_example()
    {
        $cardList = [
            'title' => 'DumpTittle'
        ];

        $response = $this->postJson('/card-list', $cardList);

        $response->assertStatus(201)->assertJson($cardList);
        $this->assertDatabaseHas('card_lists', $cardList);
    }
}
