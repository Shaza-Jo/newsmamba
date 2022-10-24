import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types"

export default class News extends Component {
    static defaultProps={
        country:"in",
        pageSize:10,
        category:"general"
    }
    static propTypes={
        country: PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string
    }
  
    constructor(props){
        super(props);
        this.state={
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `NewsMamba - ${this.capitalizeFirstLetter(this.props.category)}`
    }

     capitalizeFirstLetter=(string)=> {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

  async changePage(){
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=10`;
    this.setState({loading:true})
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(50);
    this.setState({
        articles: parsedData.articles,
        loading:false
    })
    this.props.setProgress(100);

  }

  async componentDidMount(){
    this.changePage();
  }

  handlePreClick = async()=>{
      this.setState({page:this.state.page-1})
      this.changePage();
  }

  handleNextClick = async()=>{
    this.setState({page:this.state.page+1})
    this.changePage();
  }

  render() {
    return (
      <div className="container my-3">
        <div className="row">
          <h2 className="text-center" style={{marginTop:"4.5rem"}} >NewsMamba--Breaking Bulletines</h2>
            <div className="container d-flex my-3 justify-content-between">
            <button disabled={this.state.page<=1} type="button" onClick={this.handlePreClick} className="btn btn-dark">	&larr; Previous</button>
            <button disabled={this.state.page + 1> Math.ceil(this.state.totalResults/10)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
            {this.state.articles.map((element)=>{
                return <div className="col-md-4 my-3" key={element.url}>
                <NewsItem author={!element.author?"Unknown":element.author} date={element.publishedAt} title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} url={element.urlToImage} newsUrl={element.url}/>
             </div>
            })}  
        </div>
        {this.state.loading&&<Spinner/>}
        <div className="container d-flex my-3 justify-content-between">
        <button disabled={this.state.page<=1} type="button" onClick={this.handlePreClick} className="btn btn-dark">	&larr; Previous</button>
        <a href="/" className="btn btn-sm btn-dark" rel="noreferrer">HOME</a>
        <button disabled={this.state.page + 1> Math.ceil(this.state.totalResults/10)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}
