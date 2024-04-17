import './Filters.css';

const Filters = ({ filters, setFilter }) => {
	const handleClick = filter => {
		setFilter(filter);
	};

	console.log(filters);

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
