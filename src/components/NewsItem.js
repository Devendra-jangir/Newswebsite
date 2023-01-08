import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description,imageurl,newsurl,author,date,source} = this.props;
    return (
      <div className='my-3'>
        <div className="card" >
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                position: 'absolute',
                right: '0'
              }}>
                  <span class=" badge rounded-pill bg-danger" >
                   {source}
                  </span>
              </div>
            <img src={imageurl?imageurl:"https://images.hindustantimes.com/tech/img/2022/12/27/1600x900/DSC_1667_1672152268728_1672152268898_1672152268898.jpg"} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}..</p>
                <p className="cart-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                <a href={newsurl} target= "_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read more</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
