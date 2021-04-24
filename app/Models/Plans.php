<?php

namespace App\Models;

use App\Support\HasAdvancedFilter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use \DateTimeInterface;

class Plans extends Model
{
    use HasAdvancedFilter, SoftDeletes, InteractsWithMedia, HasFactory;

    public $table = 'plans';

    protected $orderable = [
        'id',
        'name',
    ];

    protected $filterable = [
        'id',
        'name',
    ];

    protected $fillable = [
        'name',
        'cost',
        'description'
    ];

    // public function getRouteKeyName()
    // {
    //     return 'slug';
    // }
}
