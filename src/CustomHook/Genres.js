
    const useGenres =(selectedGenres)=>{
    if(selectedGenres.length < 1) return "";

    const genreIds = selectedGenres.map(g => g.id)

    return genreIds.reduce((a,c)=>a+","+c)

    


}
export default useGenres

