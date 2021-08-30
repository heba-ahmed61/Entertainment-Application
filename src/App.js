import { BrowserRouter, Route } from 'react-router-dom';
import './App.scss';
import Header from './Compontents/Header/Header';
import Movies from './Pages/Movies/Movies';
import Search from './Pages/Search/Search';
import Trending from './Pages/Trending/Trending';
import Tvseries from './Pages/Tvseries/Tvseries';
import 'bootstrap/dist/css/bootstrap.min.css';
import SimpleLabelBottomNavigation from './Compontents/Navbar/Navbar';
function App() {
  return (
    <div className="App">
    
        
      <BrowserRouter>

        <Header/> 

        <SimpleLabelBottomNavigation/>


      <Route exact  path ="/"><Trending/></Route>
      <Route  path="/movies"><Movies/></Route>
      <Route path ="/tvseries"><Tvseries/></Route>
      <Route path ="/search"><Search/></Route>


      </BrowserRouter>

    
    
    </div>
  );
}

export default App;
