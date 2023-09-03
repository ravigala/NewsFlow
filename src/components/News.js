import React, { useState, useEffect } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async () => {
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true)
    let response = await fetch(url);
    props.setProgress(40)
    let data = await response.json();
    props.setProgress(70)
    setArticles(data.articles)
    setTotalResults(data.totalResults)
    setLoading(false)
    props.setProgress(100)
  }

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pagesize=${props.pageSize}`;
    let response = await fetch(url);
    let data = await response.json();
    setArticles(articles.concat(data.articles))
    setPage(page + 1)
  };

  useEffect(() => {
    document.title = `${capitalize(props.category)} - NewsMonkey`
    updateNews();
  }, []);

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // const handlePrevClick = async ()=>{
  //   await setPage(page-1)
  //   updateNews();
  // }

  // const handleNextClick = async ()=>{
  //   await setPage(page+1)
  //   updateNews();
  // }

  return (
    <div className="container my-3">
      <h2 className="text-center" style={{ marginTop: '71px', marginBottom: '15px' }}>NewsMonkey - Top {capitalize(props.category)} Headlines</h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return <div className='col-md-4' key={element.url}>
                <Newsitem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 95) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
        </div>

      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
        <button type="button" disabled={page<=1} className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
        <button type="button" disabled={page+1 > Math.ceil(totalResults/props.pageSize)} className="btn btn-dark"onClick={handleNextClick}>Next &rarr;</button>
        </div> */}
    </div>
  )
}

News.defaultProps = {
  pageSize: 9,
  country: 'in',
  category: 'general',
}

News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
}

export default News
