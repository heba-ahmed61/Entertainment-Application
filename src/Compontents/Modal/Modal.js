import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import YouTubeIcon from '@material-ui/icons/YouTube';
import './Modal.scss';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';




const img_500 = "https://image.tmdb.org/t/p/w500";
const unavailable= "https://www.movienewz.com/img/films/poster-holder.jpg";
const noPicture ="https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";










const useStyles = makeStyles((theme) => ({
modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
},
paper: {
    width:"95%",
    minHeight:"90%",
    backgroundColor:"#394459",
    border: "1px solid #394459",
    borderRadius:10,
    color:"white",
    boxShadow:theme.shadows[5],
    padding:theme.spacing(1,1,3),
    
    
},
}));

export default function ContantModal({children , mediaType , id}) {
const classes = useStyles();
const [open, setOpen] = React.useState(false);
const [modalContent , setModalContent] = useState();
const [video , setVideo] = useState()
const [credits , setCredits]=useState()

const handleOpen = () => {
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
};

const fetchModalData = async () =>{

    const {data} = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=2c659476088254199303a6aa7b75d605&language=en-US`)
    setModalContent(data)
    
}
const fetchVideo= async ()=>{

    const {data} = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=2c659476088254199303a6aa7b75d605&language&language=en-US`)
    setVideo(data.results[0]?.key)
}


const fetchCredits = async ()=>{

    const {data} = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=2c659476088254199303a6aa7b75d605&language=en-US`)
    setCredits(data.cast)
    console.log(credits)

}


const responsive = {

    0:{

        items:4,
        autoplay:true,
        autoplayTimeout:1000,


    },
    480:{
        items:4,
        autoplay:true,
        autoplayTimeout:1000,
        

    },
    600:{
        items:5,
        autoplay:true,
        autoplayTimeout:1000,

    },
    1000:{
        items:8
    }

}





useEffect(()=>{

    fetchModalData();
    fetchVideo();
    fetchCredits()
    
},[])

return (
    <div>
    <span type="button" onClick={handleOpen}  >
        {children}
    </span>
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
        timeout: 500,
        }}
    >
        <Fade in={open}>

            
            {
                modalContent && (


        
        <div className={classes.paper} >

            <div className="modal-wrapper">

            <div className="close mb-4">
                <div className="close-btn" onClick={handleClose}>x</div>

        


                </div>
                <div className="modal-info text-center  mb-4  ">
                <h5 >{modalContent.name || modalContent.title}</h5>
                <p >{modalContent.first_air_date || modalContent.release_date}</p>
                </div>

                

                    { modalContent.overview && 
                    <div className="modal-description text-center mb-3">
                        <p> <span>story</span> : {modalContent.overview}</p>
                        </div>
                    }
                    
                
                


                    
                
                    <div className="cast-carousel mb-3 text-center ">
                        <OwlCarousel margin={5}  items={8} autoplay={true} autoplayHoverPause={true} autoplayTimeout={1000} nav={false} dots={false} responsive={responsive}>
                        
                            
                            {credits && credits.map(c => (

                            

                                <div className="item">



                                    <div className="item-image">
                                    <img src = {c.profile_path ?`${img_500}/${c.profile_path}`:noPicture}/>

                                    </div>
                                    <p className="actor-name">{c?.name}</p>




                                    


                                    
                                </div>

                                
                            )

                                



                            
                            )}
                            
                            

            
                        </OwlCarousel>
                    </div>

                
                    { video && (
                    <div className="video-btn text-center ">
                        <Button variant="contained" 
                        style={{width:"80%" , backgroundColor:"#282c34" , color:"white"}} startIcon={<YouTubeIcon/>}
                            href= {`https://www.youtube.com/watch?v=${video}`}>WATCH TRAILER</Button>

                        </div>
                    )}








            </div>
        
        
    
            

        
                

                
        


        


        </div>
                )}
        </Fade>
    </Modal>
    </div>
);
}