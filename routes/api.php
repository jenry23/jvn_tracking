<?php

Route::group(['prefix' => 'v1', 'as' => 'api.', 'namespace' => 'Api\V1\Admin', 'middleware' => ['auth:sanctum']], function () {
    // Abilities
    Route::apiResource('abilities', 'AbilitiesController', ['only' => ['index']]);

    // Locales
    Route::get('locales/languages', 'LocalesController@languages')->name('locales.languages');
    Route::get('locales/messages', 'LocalesController@messages')->name('locales.messages');

    // Permissions
    Route::resource('permissions', 'PermissionsApiController');

    // Roles
    Route::resource('roles', 'RolesApiController');

    // Users
    Route::resource('users', 'UsersApiController');

    // Expense Categories
    Route::resource('expense-categories', 'ExpenseCategoryApiController');

    // Income Categories
    Route::resource('income-categories', 'IncomeCategoryApiController');

    // Expenses
    Route::resource('expenses', 'ExpenseApiController');

    // Incomes
    Route::resource('incomes', 'IncomeApiController');

    // Expense Reports
    Route::apiResource('expense-reports', 'ExpenseReportApiController', ['only' => ['index']]);

    // Product Categories
    Route::post('product-categories/media', 'ProductCategoryApiController@storeMedia')->name('product-categories.storeMedia');
    Route::resource('product-categories', 'ProductCategoryApiController');

    // Product Tags
    Route::resource('product-tags', 'ProductTagApiController');

    // Products
    Route::post('products/media', 'ProductApiController@storeMedia')->name('products.storeMedia');
    Route::resource('products', 'ProductApiController');

    // Contact Companies
    Route::resource('contact-companies', 'ContactCompanyApiController');

    // Contact Contacts
    Route::resource('contact-contacts', 'ContactContactsApiController');

    // Crm Statuses
    Route::resource('crm-statuses', 'CrmStatusApiController');

    // Crm Customers
    Route::resource('crm-customers', 'CrmCustomerApiController');

    // Crm Notes
    Route::resource('crm-notes', 'CrmNoteApiController');

    // Crm Documents
    Route::post('crm-documents/media', 'CrmDocumentApiController@storeMedia')->name('crm-documents.storeMedia');
    Route::resource('crm-documents', 'CrmDocumentApiController');
    
    //Plans
    Route::post('plans/subscription', 'PlanApiController@subscription')->name('plans.subscription');
    Route::resource('plans', 'PlanApiController');

    //Maps
    Route::resource('map-route', 'MapRouteApiController');
});
