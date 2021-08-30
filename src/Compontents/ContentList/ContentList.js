import React, { useEffect, useState } from 'react';
import './ContentList.scss';
import ContantModal from '../Modal/Modal';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import YouTubeIcon from '@material-ui/icons/YouTube';




const ContentList = (props) =>{
    //sizes of imagesPoster
    const img_300 = "https://image.tmdb.org/t/p/w500"
    const img_500 = "https://image.tmdb.org/t/p/w500";
    //unavailable image

    const unavailable= "https://www.movienewz.com/img/films/poster-holder.jpg";

    const [videoLink , setVideoLink] = useState()

    const fetchVideoLink= async ()=>{

        const {data} = await axios.get(`https://api.themoviedb.org/3/${props.mediaType}/${props.id}/videos?api_key=2c659476088254199303a6aa7b75d605&language&language=en-US`)
        
        setVideoLink(data.results[0]?.key)
    }

    useEffect(()=>{

        fetchVideoLink()
    },[])



    return(

        <div  className="content-list-item" >
            <div className="content-image">
        <img src ={props.poster ?`${img_300}/${props.poster}`:unavailable} />
        </div>
        <div className="content-title my-2 text-center">
            <h6>{props.title}</h6>
        </div>
        <div className="content-info  text-center ">
            <div className="content-info-media-type mb-2">
                <span>{props.mediaType}</span>
            </div>
            <div className="content-info-date">
                
                {props.date? <span>{props.date}</span> : <span>No Available date</span>}
            </div>

            <div className="video-button text-center my-3">
            <Button variant="contained" 
            style ={{width:"75%" , backgroundColor:"#282c34" , color:"white" , border : "1px solid white"}} startIcon={<YouTubeIcon/>}
            href= {`https://www.youtube.com/watch?v=${videoLink}`}>WATCH TRAILER</Button>
            
        </div>
        <ContantModal mediaType={props.mediaType} id={props.id} className="btn-wrapper">

            <button className="details-btn" >Details</button>

        </ContantModal>

        </div>
        </div>
    )
}
export default  ContentList ;
