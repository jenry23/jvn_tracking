<?php

namespace App\Http\Controllers\Api\V1\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Plan;
use App\User;
use App\Http\Resources\Admin\SubscriptionResource;
use App\Http\Controllers\Controller;

class SubscriptionApiController extends Controller
{   
    protected $stripe;

    public function __construct() 
    {
        $this->stripe = new \Stripe\StripeClient(env('STRIPE_SECRET'));
    }

    public function create(Request $request, Plan $plan)
    {
        $plan = Plan::findOrFail($request->get('plan'));
        
        $user = $request->user();
        $paymentMethod = $request->paymentMethod;

        $user->createOrGetStripeCustomer();
        $user->updateDefaultPaymentMethod($paymentMethod);
        $user->newSubscription('default', $plan->stripe_plan)
            ->create($paymentMethod, [
                'email' => $user->email,
            ]);
        
        return redirect()->route('home')->with('success', 'Your plan subscribed successfully');
    }


    public function createPlan()
    {
        return view('plans.create');
    }

    public function storePlan(StorePlansRequest $request)
    {   
        $data = $request->except('_token');

        $data['slug'] = strtolower($data['name']);
        $price = $data['cost'] *100; 

        //create stripe product
        $stripeProduct = $this->stripe->products->create([
            'name' => $data['name'],
        ]);
        
        //Stripe Plan Creation
        $stripePlanCreation = $this->stripe->plans->create([
            'amount' => $price,
            'currency' => 'inr',
            'interval' => 'month', //  it can be day,week,month or year
            'product' => $stripeProduct->id,
        ]);

        $data['stripe_plan'] = $stripePlanCreation->id;

        // Plan::create($data);
        
        return (new SubscriptionResource($data))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);

        echo 'plan has been created';
    }
}