import React,{Component} from 'react';
import {BlogDetailRequest} from '../../config/request';
import axios from 'axios';

class Detail extends Component{
  constructor(props){
    super(props)
  }
  render(){
    const {content,title,date,tag} = this.props.articleData
    return (
      <div className='detail'>
        <div className="blog-detail-main">
          <div className="blog-detail-head">
            <h1 className="blog-detail-title">{title}</h1>
            <p className="blog-detail-info">
              <span>{date}</span>
              <span>
                【{tag.length ? tag.join(' | ') : '个人博客'}】
              </span>
            </p>
            <p>{content}</p>
          </div>
          {/*<div dangerouslySetInnerHTML={{ __html: output }} /> */}
        </div>
      </div>
    )
  }
}

Detail.getInitialProps = async function(context){
  const {id} = context.query;
  const res = await axios.get(BlogDetailRequest(id))
  return {
    articleData:res.data.data
  }
}

export default Detail