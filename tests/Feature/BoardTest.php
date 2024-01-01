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
}
