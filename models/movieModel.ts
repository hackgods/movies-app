export interface MovieModel {
	_id: string;
	id: number;
	videoUrl: string;
	title: string;
	overview: string;
	backdropPath: string;
	genres: string[];
	homepage: string;
	popularity: number;
	posterPath: string;
	productionCompanies: string[];
	productionCountries: string[];
	revenue: number;
	runtime: number;
	spokenLanguages: string[];
	status: string;
	voteAverage: number;
	voteCount: number;
	ytLink: string;
	ytID: string;
	__v: number;
  }