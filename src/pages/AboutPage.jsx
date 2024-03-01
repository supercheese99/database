import React from 'react'
import {useEffect} from 'react';

const AboutPage = () => {

  useEffect(() => {
    document.title = 'About';
  }, []);

  return (
    <div className="about-text">
      <h4>This product uses the TMDB API but is not endorsed or certified by TMDB.</h4>

      <h1>About SuperMovies</h1>
      <p>The "Movie Database Explorer" is a React web application developed as part of the Front-End Web Development program for educational purposes. This project utilizes the TMDB (The Movie Database) API to provide users with an interactive and dynamic interface to explore and manage their favorite movies.</p>

      <h3>Key Features:</h3>
      <p>
        <ol>
          <li><strong>Movie Discovery:</strong> Users can browse a curated list of movies fetched from the TMDB API, showcasing details such as title, release date, and genre.</li>
          <li><strong>Favorites List:</strong> The application allows users to create their personalized list of favorite movies. A simple and intuitive interface lets users add movies to their favorites with just a click.</li>
        </ol>
      </p>

      <p>This project serves as a hands-on learning experience for front-end web development concepts. It covers topics such as React components, state management, API integration, and the basics of user interface design. By building this application, participants gain practical skills in creating interactive and responsive web interfaces.</p>

      <h3>Techonologies Used:</h3>
      <p>
        <ol>
          <li><a href="https://www.themoviedb.org/">The Movie Database API</a></li>
          <li>React.js</li>
          <li>Axios for HTTPS Requests</li>
        </ol>
      </p>

      <p>This project is created solely for educational purposes during the Front-End Web Development program. It aims to provide a practical and engaging environment for learning essential front-end development skills.</p>

    </div>
  )
}

export default AboutPage