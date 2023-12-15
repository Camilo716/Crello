<?php

namespace Tests\Unit\Requests;

use Tests\TestCase;
use App\Http\Requests\CreateCardRequest;
use Illuminate\Support\Facades\Validator;

class CreateCardRequestTest extends TestCase
{
    public function test_should_pass_with_valid_data()
    {
        $request = new CreateCardRequest();
        $validData = [             
            'title' => 'Valid Tittle',
            'content' => 'Valid Content',
        ];

        $validator = Validator::make($validData, $request->rules());

        $this->assertTrue($validator->passes());
    }

    /**
     * @dataProvider provideInvalidData
     */
    public function test_should_fail_with_invalid_data(array $invalidData)
    {
        $request = new CreateCardRequest();

        $validator = Validator::make($invalidData, $request->rules());

        $this->assertFalse($validator->passes());
    }

    public function provideInvalidData() : array
    {
        return [
            [['tittle' => 'Valid title']], // Missing content

            [['content' => 'Valid content']] // Missing title
        ];
    }

}
