<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Plans;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Gate;
use App\Http\Resources\Admin\PlansResource;
use App\Http\Requests\StorePlansRequest;

class PlanApiController extends Controller
{
    public function index()
    {
        abort_if(Gate::denies('plans_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new PlansResource(Plans::advancedFilter());
    }

    public function store(StorePlansRequest $request)
    {
        $plans = Plans::create($request->validated());

        return (new PlansResource($plans))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show($id, Request $request)
    {   
        abort_if(Gate::denies('plans_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $plan = Plans::findOrFail($id); 

        return new PlansResource($plan);
    }
    public function destroy(Plan $plan)
    {
        abort_if(Gate::denies('plans_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        dd($plan);
        $plan->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }
    public function subscription(Request $request){
        // $user = User::firstOrCreate(
        //     [
        //         'email' => $request->input('email')
        //     ],
        //     [
        //         'password' => Hash::make(Str::random(12)),
        //         'name' => $request->input('first_name') . ' ' . $request->input('last_name'),
        //         'address' => $request->input('address'),
        //         'city' => $request->input('city'),
        //         'state' => $request->input('state'),
        //         'zip_code' => $request->input('zip_code')
        //     ]
        // );

        // try {
        //     $payment = $user->charge(
        //         $request->input('amount'),
        //         $request->input('payment_method_id')
        //     );

        //     $payment = $payment->asStripePaymentIntent();

        //     $order = $user->orders()
        //         ->create([
        //             'transaction_id' => $payment->charges->data[0]->id,
        //             'total' => $payment->charges->data[0]->amount
        //         ]);

        //     foreach (json_decode($request->input('cart'), true) as $item) {
        //         $order->products()
        //             ->attach($item['id'], ['quantity' => $item['quantity']]);
        //     }

        //     $order->load('products');
        //     return $order;

        // } catch (\Exception $e) {
        //     return response()->json(['message' => $e->getMessage()], 500);
        // }
    }
}
