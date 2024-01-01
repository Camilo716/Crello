<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BoardTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_client_get_all_boards()
    {
        $response = $this->getJson('/api/board');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id', 'name'
                ] 
            ]
        ]);
    }

    public function test_client_add_new_board()
    {
        $board = [
            'name' => 'Board Name'
        ];

        $response = $this->postJson('/api/board', $board);

        $response->assertStatus(201);
        $response->assertJsonStructure([
            'data' => [
                'id', 'name'
            ]
        ]);
    }
}
