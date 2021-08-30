import React, { useEffect, useState } from 'react';
import './Search.scss';
import { TextField } from '@material-ui/core';
import SearchIcon  from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import axios from 'axios';
import ContentList from '../../Compontents/ContentList/ContentList';
import Pagination from '@material-ui/lab/Pagination';




const Search= ()=>{

    const [type , setType] = useState(0)
    const [page , setPage]=useState(1)
    const [searchText , setSearchText]=useState("")
    const [content , setContent]=useState()
    const [pagesNumber , setPagesNumber]=useState()
    
    const fetchSearch =async () =>{ 
    
        const {data} = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv":"movie"}?api_key=2c659476088254199303a6aa7b75d605&language=en-US&query=${searchText}&page=${page}&include_adult=false`)
        setContent(data.results)
        setPagesNumber(data.total_pages)
        
        
    }

    useEffect(()=>{
        window.scroll(0,0)
        fetchSearch();
    },[type , page])

    const handelPage=(pageNumber)=>{

        setPage(pageNumber)
        window.scroll(0,0)


    }






    return(
        <div className="search ">
            <div className="container  ">
                <div className="search-content">
        <TextField id="filled-basic"  onChange ={(e)=>setSearchText(e.target.value)}label="Search..." variant="filled" style={{width:"70%" ,  color:"green"}} />
        <Button variant='contained' style={{marginLeft: "10px" , }} onClick={fetchSearch }><SearchIcon style={{}}/></Button>
        </div>

        <div className="search-tabs">
        <Tabs value={type} indicatorColor="primary"
        textColor="primary"  onChange={(e, newValue) =>{

            setType(newValue)
            setPage(1)
            console.log(type)
        }}>
            <Tab style={{width:"50%" }} label="SearchMovies"></Tab>
            <Tab style={{width:"50%"}} label="SearchSeries"></Tab>




        </Tabs>
    

        </div>


        <div className="search-list ">
                    {content && content.map(c => <ContentList key={c.id} id={c.id}

                    poster={c.poster_path} title={c.title || c.name} mediaType={type ? "tv" : "movie"} 
                    date={c.release_date || c.first_air_date} voteAvarage={c.vote_average}
                    
                    />)}

                </div>



                
            

        
            

        
    
                        

        
        


        
        <div className="pagination ">

            {
                pagesNumber >1 &&

        <Pagination count={pagesNumber} size="small" onChange={(e)=>handelPage(e.target.textContent)}   />
            }
        </div>




        




            
        

        </div>
    
    </div>
    )
}

export default Search ;