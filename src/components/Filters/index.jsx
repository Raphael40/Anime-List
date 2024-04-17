import './Filters.css';

const filters = [
	{ _id: 'All' },
	{ _id: 'Airing' },
	{ _id: 'Upcoming' },
	{ _id: 'TV' },
	{ _id: 'Movie' },
	{ _id: 'Popular' }
];

const Filters = ({ setFilter }) => {
	const handleClick = filter => {
		const lowerCaseFilter = filter.toLowerCase();
		if (lowerCaseFilter === 'popular') {
			setFilter('bypopularity');
		} else {
			setFilter(lowerCaseFilter);
		}
	};

	return (
		<div role='filters-list' className='filters-container'>
			{filters.map(filter => (
				<p className='filter-tag' onClick={() => handleClick(filter._id)} key={filter._id}>
					{filter._id}
				</p>
			))}
		</div>
	);
};

export default Filters;
