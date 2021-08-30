import { Chip } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect } from 'react'


const Genres =(props)=>{

    const handleClick=(genre)=>{

        props.setSelectedGenres([...props.selectedGenres , genre]);
        props.setGenres(props.genres.filter(g =>g.id !== genre.id));
        



    }

    const handleDelete = (genre) =>{

        props.setSelectedGenres(props.selectedGenres.filter(s => s.id !==genre.id))
        props.setGenres([...props.genres , genre]);
        props.setPage(1);

    }
    const fetchGenres = async ()=>{

        const {data} = await axios.get(`https://api.themoviedb.org/3/genre/${props.type}/list?api_key=2c659476088254199303a6aa7b75d605&language=en-US`)
        props.setGenres(data.genres)
        props.setPage(1);


    }

    useEffect(()=>{

        fetchGenres();
    },[])
    
    return(
        <div className="genres">

            {
                props.selectedGenres &&  props.selectedGenres.map(g => <Chip onDelete={()=> handleDelete(g)}  color= "primary" key={g.id} label={g.name}style={{margin:5}} size="medium" clickable/>)
            }


            {
                props.genres && props.genres.map(g => <Chip onClick={()=>handleClick(g)}  key={g.id} label={g.name} style={{margin:5}} size="medium" clickable/>)
            }
        </div>
    )
}

export default Genres
