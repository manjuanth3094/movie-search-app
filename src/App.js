import React, { useState, useEffect } from "react"
import axios from "axios"

import "./App.css";
import Header from "./Header"
import Movie from "./Movie"
import Search from "./Search"


const MOVIE_API_URL = 'https://www.omdbapi.com/?s=man&apikey=4a3b711b'


const App = (props) => {
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
    
    useEffect(() => {
      axios.get(MOVIE_API_URL)
        .then(response => {
          //console.log(response.data)
          //console.log(response.data.Search)
          const result = response.data.Search
          setMovies(result)
          setLoading(false)
        })      
    }, [])

    const search = searchValue => {
      setLoading(true)
      setErrorMessage(null)
      
      axios.get( ` https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b ` )
        .then(response => {
          //console.log(response.data)
          //console.log(response.data.Response)
          
          if(response.data.Response === 'True') {
            setMovies(response.data.Search)
            setLoading(false)
          } else {
            //console.log(response.data.Error)            
            setErrorMessage(response.data.Error)
            setLoading(false)
          }
        })        
  	}
    
    return (
     <div className="App">

      <Header text="Movie-Search-App" />
      <Search search={search} />

      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        { 
          loading && !errorMessage ? (
            <span> loading.... </span>
          ) 
          : 
          errorMessage ? (
            <div className="errorMessage"> { errorMessage } </div>
          ) 
          : (
            movies.map((movie, index) => {
              return <Movie key={`${index}-${movie.Title}`} movie={movie} />
            })
          )
        }
      </div>
    </div>
  )
}

export default App;