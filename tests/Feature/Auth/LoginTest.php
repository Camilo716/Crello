<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    public function test_example()
    {
        $user = User::factory()->create([
            'password' => bcrypt($password = 'my-secret-password'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => $password,
            'token_name' => 'test_name',
        ]);

        $response
            ->assertStatus(200)
            ->assertJsonStructure(['data' => ['token']]);
        $this->assertAuthenticatedAs($user, $guard = null);
    }
}
