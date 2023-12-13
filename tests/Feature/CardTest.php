<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CardTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_client_post_new_card()
    {
        $card = [
            'tittle' => 'DumpTittle',
            'content' => 'DumpDescription'
        ];

        $response = $this->postJson('/card', $card);

        $response
            ->assertStatus(201)
            ->assertJson($card);
    }
}
