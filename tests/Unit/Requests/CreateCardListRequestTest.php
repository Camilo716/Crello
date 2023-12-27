<?php

namespace Tests\Unit\Requests;

use App\Http\Requests\CreateCardListRequest;
use Tests\TestCase;
use Illuminate\Support\Facades\Validator;

class CreateCardListRequestTest extends TestCase
{
    public function test_should_pass_with_valid_data()
    {
        $request = new CreateCardListRequest();
        $validData = [             
            'title' => 'Valid Title',
            'board_id' => 1, 
        ];

        $validator = Validator::make($validData, $request->rules());

        $this->assertTrue($validator->passes());
    }

    /**
     * @dataProvider provideInvalidData
     */
    public function test_should_fail_with_invalid_data(array $invalidData)
    {
        $request = new CreateCardListRequest();

        $validator = Validator::make($invalidData, $request->rules());

        $this->assertFalse($validator->passes());
    }

    public function provideInvalidData() : array
    {
        return [
            [[]], // Missing title
        ];
    }

}
