const useGenre = (selectedGenres) => {
    if (selectedGenres.length < 1) return "";
  
    const GenreIds = selectedGenres.map((g) => g.id);
    return GenreIds.reduce((acc, curr) => acc + "," + curr);
  };
  
  export default useGenre;

//selectedGenres has 2 values: 'id' and 'name'
//want to return all of the selected genre ids as comma separated values