export interface Film {
	year: number;
	title: string;
	imdbId: string;
	reason: string;
	passed: boolean;
	budget: number;
	domesticGross: number;
	internationalGross: number;
	posterUrl: string;
	overview: string;
	rating: number;
}

export interface FilmResult {
	count: number;
	pageCount: number;
	currentPage: number;
	results: Film[];
}