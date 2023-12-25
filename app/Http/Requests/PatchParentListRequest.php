<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PatchParentListRequest extends FormRequest
{
    public function authorize() : bool
    {
        return true;
    }

    public function rules() : array
    {
        return [
            "card_list_id" => "required"
        ];
    }
}
