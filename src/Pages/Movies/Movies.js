import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ContentList from '../../Compontents/ContentList/ContentList';
import Pagination from '@material-ui/lab/Pagination';
import Genres from '../../Compontents/Genres/Genres';
import './Movies.scss';
import useGenres from '../../CustomHook/Genres';

const Movies= ()=>{

    


    const [movies , setMovies] =useState([])
    const [page,setPage]=useState(1)
    const [genres , setGenres]=useState([])
    const [selectedGenres , setSelesctedGenres]=useState([])
    const genreforURL=useGenres(selectedGenres)
    const [pagesNumber , setPagesNumber]=useState(1)
    const moviesFetch = async()=>{
        const {data}= await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=2c659476088254199303a6aa7b75d605&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}&with_watch_monetization_types=flatrate`)
        setMovies(data.results)
        setPagesNumber(data.total_pages)
    }

    const handelPage=(pageNumber)=>{
            
        setPage(pageNumber)
        window.scroll(0,0)


    }


useEffect(()=>{

    moviesFetch()
},[page , genreforURL])
    return(

        <div className="movies">

                <div className="container">
                <Genres type="movie" genres={genres} setGenres={setGenres} 
                selectedGenres={selectedGenres} 
                setSelectedGenres={setSelesctedGenres}
                setPage={setPage}
                />

                    <div className="movies-list">
                        {
                            movies && movies.map(movie => <ContentList key={movie.id} id={movie.id}

                                poster={movie.poster_path} title={movie.title} mediaType="movie" 
                                date={movie.release_date } voteAvarage={movie.vote_average}/>)}
                        
                    </div>

                    <div className="pagination ">

                <Pagination count={pagesNumber} size="small" onChange={(e)=>handelPage(e.target.textContent)}  />
                </div>
        

                </div>
        

        
        </div>
        
    )
}

export default Movies ;