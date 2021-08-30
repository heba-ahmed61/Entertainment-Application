import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ContentList from '../../Compontents/ContentList/ContentList';
import Pagination from '@material-ui/lab/Pagination';
import useGenres from '../../CustomHook/Genres';
import Genres from '../../Compontents/Genres/Genres';
import './Tvseries.scss';

const TvSeries = () =>{

    const [series , setSeries]=useState([])
    const [page , setPage]=useState(3)
    const [genres , setGenres]=useState([])
    const [selectedGenres , setSelesctedGenres]=useState([])
    const genreforURL=useGenres(selectedGenres)
    const [pagesNumber , setPagesNumber]=useState(1)


    const fetchSeries = async ()=>{

        const {data} = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=2c659476088254199303a6aa7b75d605&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&page=${page} &with_genres=${genreforURL}`)

        setSeries(data.results)
        setPagesNumber(data.total_pages)
    }

    const handelPage=(pageNumber)=>{

        setPage(pageNumber)
        window.scroll(0,0)
    }

    useEffect(()=>{

        fetchSeries();
    })

    return(

        <div className="tv-series">
        
            <div className="container">
            <Genres type="movie" genres={genres} setGenres={setGenres} 
                selectedGenres={selectedGenres} 
                setSelectedGenres={setSelesctedGenres}
                setPage={setPage}
                />

                <div className="series-list">

                    {
                        series && series.map(item => <ContentList key={item.id} id={item.id} 

                            poster={item.poster_path} title={item.name } mediaType="tv" 
                                date={item.first_air_date} voteAvarage={item.vote_average}/>)
                    }
                </div>

                <div className="pagination ">

                    <Pagination count={pagesNumber} size="small" onChange={(e)=>handelPage(e.target.textContent)}  />
                    </div>



            </div>
        </div>
    )
}

export default TvSeries;

