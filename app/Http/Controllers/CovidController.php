<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CovidController extends Controller
{
    public function index()
    {
         // Ambil tanggal terakhir
        $latestDate = DB::table('covid_reports')->max('date');

        // Ambil summary total
        $summary = DB::table('covid_reports')
            ->where('date', $latestDate)
            ->select('confirmed', 'recovered', 'deaths', 'fatality_rate', 'active', 'last_update')
            ->first();

        $positivePotential = $summary->confirmed > 0 ? ($summary->active / $summary->confirmed) * 100 : 0;

        $summary->positivity_potential = round($positivePotential,2);

        // Ambil data timeline (30 hari terakhir)
        $timeline = DB::table('covid_reports')
            ->orderBy('date')
            ->select('date', 'confirmed_diff', 'recovered_diff', 'deaths_diff')
            ->get();

        return Inertia::render('dashboard', [
            'summary' => $summary,
            'timeline' => $timeline,
        ]);
    }
}
