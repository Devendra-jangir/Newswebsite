import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";




export class News extends Component {

    static defaultProps = {
        country:"in",
        pageSize: 8
    }

    static propTypes = {
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category: PropTypes.string,

    }
    capitlizefirstLetter = (string)=>{
        return string.charAt(0).toUpperCase()+ string.slice(1);
    }
    constructor(props){
        super(props);
        console.log("Hello I am constructor from news component");
        this.state ={
            articles: [],
            loading: false,
            page:1,
            totalResults:0
        }
        document.title= `${this.capitlizefirstLetter(this.props.category) }- NewsMonkey`
    }
    async updateNews(pageNo){
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4d9be03f8f5e4ad0800225f50d8acc3d&${this.state.page}&pageSize=${this.props.pageSize}`;
        let data =await fetch(url);
        this.props.setProgress(30)
        let parsedData = await data.json();
        this.props.setProgress(70)
        console.log(parsedData);
        this.setState({articles: parsedData.articles,totalResults: parsedData.totalResults});
        this.props.setProgress(100);
    }
    async componentDidMount(){
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4d9be03f8f5e4ad0800225f50d8acc3d&page=1&pageSize=${this.props.pageSize}`;
        // let data =await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({articles: parsedData.articles,totalResults: parsedData.totalResults})
        this.updateNews();

    }
    handlePrevClick =async ()=>{
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4d9be03f8f5e4ad0800225f50d8acc3d&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        // let data =await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);

        // this.setState({
        //     page: this.state.page-1,
        //     articles: parsedData.articles
        // })
        this.setState({page: this.state.page+1})
        this.updateNews();

    }
    handleNextClick =async ()=>{
        // if(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

        // }
        // else{
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4d9be03f8f5e4ad0800225f50d8acc3d&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        //     let data =await fetch(url);
        //     let parsedData = await data.json();
        //     console.log(parsedData);

        //     this.setState({
        //         page: this.state.page+1,
        //         articles: parsedData.articles
        //     })
        // }
        this.setState({page: this.state.page+1})
        this.updateNews();
    }
    fetchMoreData =async () => {
        this.setState({page: this.state.page+1});
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4d9be03f8f5e4ad0800225f50d8acc3d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data =await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: this.state.articles.concat(parsedData.articles),totalResults: parsedData.totalResults})
      };
    
  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center" style={{margin : '35px 0px'}}>Daily News- Top Headlines from {this.capitlizefirstLetter(this.props.category) }</h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.totalResults}
          loader={<h4>Loading...</h4>}
        >
            <div className="container">
        <div className="row">
            {this.state.articles.map((element)=>{
                return <div className="col-md-4" key = {element.url}>
                <NewsItem  title = {element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} 
                newsurl={element.url} imageurl = {element.urlToImage} author = {element.author} date={element.publishedAt}
                source = {element.source.name}/>
            </div>
            })}
            </div>   
        </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled = {this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>
        </div> */}
      </div>
    )
  }
}

export default News
