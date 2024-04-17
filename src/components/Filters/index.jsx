import './Filters.css';

const Filters = ({ filters, setFilter }) => {
	const handleClick = filter => {
		if (filter === 'popular') {
			setFilter('bypopularity');
		} else {
			setFilter(filter);
		}
	};

	return (
		<div role='genres-list' className='filters-container'>
			{filters.map(filter => (
				<p className='filter-tag' onClick={() => handleClick(filter._id)} key={filter._id}>
					{filter._id}
				</p>
			))}
		</div>
	);
};

export default Filters;
