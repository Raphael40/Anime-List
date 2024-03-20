import './SearchForm.css';

const SearchForm = ({ inputValue, handleSubmit, handleInput }) => {
	return (
		<>
			<form role='search-form' className='search-form' onSubmit={handleSubmit}>
				<input
					type='text'
					onChange={handleInput}
					value={inputValue}
					placeholder='Berserk'
					required
				/>
				<input type='submit' value='Search' />
			</form>
		</>
	);
};

export default SearchForm;
