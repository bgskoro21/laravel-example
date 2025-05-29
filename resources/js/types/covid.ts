export interface CovidSummary {
    confirmed: number;
    recovered: number;
    deaths: number;
    fatality_rate: number; // 0.0345 = 3.45%
    positivity_potential: number;
    last_update: string;
}

export interface CovidTimelineItem {
    date: string; // format: "YYYY-MM-DD"
    confirmed: number;
    confirmed_diff: number;
    recovered: number;
    recovered_diff: number;
    deaths: number;
    deaths_diff: number;
}
