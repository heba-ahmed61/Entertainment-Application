import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ContentList from '../../Compontents/ContentList/ContentList';
import Pagination from '@material-ui/lab/Pagination';
import './Trending.scss';

const Trending = ()=>{

    const [trending, setTrending]=useState([])
    const [page , setpage]=useState(1)
    const [pagesNumber, setPagesNumber]=useState(1)


    const API_KEY="2c659476088254199303a6aa7b75d605"

    const fetchMovies = async()=>{

        const {data}= await axios.get(`
        https://api.themoviedb.org/3/trending/all/day?api_key=2c659476088254199303a6aa7b75d605&page=${page}`);
        setTrending(data.results)
        setPagesNumber(data.total_pages)

    }

    useEffect(()=>{

        fetchMovies()


    },[page])

    const handelPage=(pageNumber)=>{

        setpage(pageNumber)
        window.scroll(0,0)


    }


    return(
        <div className="trending">
            <div className="container">
                <div className="trending-list ">
                    {trending && trending.map(trend => <ContentList key={trend.id} id={trend.id}

                    poster={trend.poster_path} title={trend.title || trend.name} mediaType={trend.media_type} 
                    date={trend.release_date || trend.first_air_date} voteAvarage={trend.vote_average}
                    
                    />)}
                </div>

                <div className="pagination ">

                <Pagination count={pagesNumber} size="small" onChange={(e)=>handelPage(e.target.textContent)} />
                </div>


                
            </div>
        </div>
    )
}

export default Trending;