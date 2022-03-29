type Character = {
	id: number;
	name: string;
	status: 'Alive' | 'Dead' | 'unknown';
	species: string;
	type: string;
	gender: string;
	origin: any;
	location: any;
	image: string;
	episode: string[];
	url: string;
	created: string;
};

//type Location = {}

export default Character;
