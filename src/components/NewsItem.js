import React, { Component } from "react"; 

export default class NewsItem extends Component {
  render() {
    let { title, description, url, newsUrl, author, date } = this.props;
    let newDate = new Date(date);
    return (
      <div className="card">
        <img
          src={url?url:"https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}.....</h5>
          <p className="card-text">{description}.....</p>
          <p className="card-text"><small className="text-muted">Updated by {author} at {newDate.toUTCString()}</small></p>
          <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark" rel="noreferrer">
            Read More
          </a>
        </div>
      </div>
    );
  }
}
