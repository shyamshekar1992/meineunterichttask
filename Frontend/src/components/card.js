import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./css/Movie.css";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxHeight: 220,
    minHeight: 220,
    boxShadow: "none",
    borderRadius: 0,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard({ items }) {
  const classes = useStyles();
  //to display data from mongoose database
  return items.map((item) => (
    <article className="postcard blue">
      <a className="postcard__img_link" href="#">
        <img className="postcard__img" src={item.Poster} alt="Image Title" />
      </a>
      <div className="postcard__text">
        <h1 className="postcard__title blue">
          <a href="#">{item.Title}</a>
        </h1>
        <div className="postcard__subtitle small">
          <time dateTime="2020-05-25 12:00:00">
            <i className="fas fa-calendar-alt mr-2"></i> Director :
            {item.Director}
          </time>
        </div>
        <div className="postcard__bar"></div>
        <div className="postcard__preview-txt">
          {item.Genre} is the Genre. The writers are {item.Writer}. Actors of
          the movie are {item.Actors}. The plot is {item.Plot} <br /> And the
          movie {item.Title} has won {item.Awards} awards. The {item.Type} has{" "}
          {item.BoxOffice} Box Office records.
        </div>
        <ul className="postcard__tagbox">
          <li className="tag__item">
            <i className="fas fa-tag mr-2"></i>
            {item.Language}
          </li>
          <li className="tag__item">
            <i className="fas fa-clock mr-2"></i>
            {item.Released}
          </li>
          <li className="tag__item play blue">
            <a href="#">
              <i className="fas fa-play mr-2"></i>
              {item.Runtime}
            </a>
          </li>
        </ul>
      </div>
    </article>
  ));
}
