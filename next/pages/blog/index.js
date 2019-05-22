import React from 'react'
import {BlogListRequest} from '../../config/request'
import axios from 'axios';
import List from './list';
import { Pagination } from 'antd';
import Router,{withRouter} from 'next/router';
import Link from 'next/link'
class Bolg extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      current:1
    }
  }

  paginationRender(page, type, originalElement){

		if (type === 'prev') {
			return <a title="上一页">上一页</a>;
		} else if (type === 'next') {
			return <a title="下一页">下一页</a>;
		}
			
		return (
			<Link as={`/blog/${page}`} href={`/blog?page=${page}`}>
				<span>{page}</span>
			</Link>
		)
  }
  paginationChange(){
    Router.push(`/blog/${page}`)
  }
  
  render(){
    const {list} = this.props.articleData;
    return (
      <div>
        <List source={list} />
        <Pagination 
          total={0} 
          current={ 1}
          defaultPageSize={3}
          onChange={this.paginationChange.bind(this)}
          itemRender={this.paginationRender.bind(this)}
        />
      </div>
    )
  }
}

Bolg.getInitialProps = async function(context){
  const {page} = context.query;
  const initPagination = {
    pageSize:3,
    currentPage:page || 1,
    cat:'technology'
  }
  const articleList = await axios.post(BlogListRequest,initPagination);
  console.log(articleList,'articlelist')
  if(articleList.data.code){
    return {
      articleData:articleList.data,
    }
  }else{
    return {isEmpty:true}
  }
}

export default Bolg
