import React from 'react'

const Newsitem = (props) => {
    let {title, description, imageUrl, newsUrl, author, date, source} = props;
    return (
      <div>
        <div className="card my-2">
        <span className="badge rounded-pill bg-danger" style={{display:'flex',justifyContent:'flex-end', position:'absolute', right:'0'}}> {source} </span>
            <img src={imageUrl ? imageUrl: "./news.jpg"} className="card-img-top" alt="..." style={{maxHeight:'236.375px'}}/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-muted">By {author ? author:"Unknown"} on {new Date(date).toUTCString()}</small></p>
                <a href={newsUrl} target='_blank' className="btn btn-sm btn-dark" rel="noreferrer" >Read More</a>
            </div>
        </div>
      </div>
    )
}

export default Newsitem
