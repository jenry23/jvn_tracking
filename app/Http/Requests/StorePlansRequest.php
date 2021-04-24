<?php

namespace App\Http\Requests;

use App\Models\Plan;
use Gate;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;

class StorePlansRequest extends FormRequest
{
    public function authorize()
    {
        return Gate::allows('plans_create');
    }

    public function rules()
    {
        return [
            'id' => [
                'integer',
                'exists:plans,id',
                'nullable',
            ],
            'name'        => [
                'string',
                'nullable',
            ],
            'cost'             => [
                'numeric',
                'required',
            ],
            'description'        => [
                'string',
                'nullable',
            ],
        ];
    }
}
