import './Filters.css';

const filters = [
	{ _id: 'Award Winning' },
	{ _id: 'Action' },
	{ _id: 'Suspense' },
	{ _id: 'Horror' },
	{ _id: 'Avant Garde' },
	{ _id: 'Sports' },
	{ _id: 'Supernatural' },
	{ _id: 'Fantasy' },
	{ _id: 'Gourmet' },
	{ _id: 'Drama' },
	{ _id: 'Comedy' },
	{ _id: 'Mystery' },
	{ _id: 'Slice of Life' },
	{ _id: 'Adventure' },
	{ _id: 'Romance' },
	{ _id: 'Sci-Fi' }
];

const Filters = ({ setFilter }) => {
	const handleClick = filter => {
		setFilter(filter);
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
