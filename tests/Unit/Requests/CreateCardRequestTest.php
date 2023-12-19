<?php

namespace Tests\Unit\Requests;

use Tests\TestCase;
use App\Http\Requests\CreateCardRequest;
use Illuminate\Support\Facades\Validator;

class CreateCardRequestTest extends TestCase
{
    /**
     * @dataProvider provideValidData
     */
    public function test_should_pass_with_valid_data(array $validData)
    {
        $request = new CreateCardRequest();

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

    public function provideValidData() : array
    {
        return [
            [[        
                'title' => 'Valid Title',
                'content' => 'Valid Content',
                'card_list_id' => 1
            ]], 

            [[        
                'title' => 'Valid Title',
                'content' => '',
                'card_list_id' => 1
            ]]
        ];
    }

    public function provideInvalidData() : array
    {
        return [
            [[  // Missing content
                'tittle' => 'Valid title',
                'card_list_id' => 1
            ]], 

            [[  // Missing title
                'content' => 'Valid content',
                'card_list_id' => 1
            ]]
        ];
    }

}
