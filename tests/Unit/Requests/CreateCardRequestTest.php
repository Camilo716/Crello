<?php

namespace Tests\Unit\Requests;

use Tests\TestCase;
use App\Http\Requests\CreateCardRequest;
use Illuminate\Support\Facades\Validator;

class CreateCardRequestTest extends TestCase
{
    public function test_passes_validation_with_required_data()
    {
        $request = new CreateCardRequest();
        $validData = [             
            'tittle' => 'Valid Tittle',
            'content' => 'Valid Content',
        ];

        $validator = Validator::make($validData, $request->rules());

        $this->assertTrue($validator->passes());
    }

    /**
     * @dataProvider provideInvalidData
     */
    public function testInvalidData(array $invalidData)
    {
        $request = new CreateCardRequest();

        $validator = Validator::make($invalidData, $request->rules());

        $this->assertFalse($validator->passes());
    }

    public function provideInvalidData() : array
    {
        return [
            [['tittle' => 'Valid tittle']], // Missing content

            [['content' => 'Valid content']] // Missing tittle
        ];
    }

}
