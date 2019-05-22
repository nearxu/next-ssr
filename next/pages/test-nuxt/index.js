
import React from 'react'
// v1
// export default () => <div>welcome to nextjs</div>

// v2 style
// export default () =>
//   <div>
//     <h1>hello world</h1>
//     <p>scoped!</p>
//     <style jsx>
//       {`
//         p{color:blue}
//         div{background:red}
//       `}
//     </style>
//     <style jsx>
//       {`
//         body{color:white}
//       `}
//     </style>
//   </div>

// v3 static source

// export default () => <img src="/static/img/figure_1.png" alt="my img" />

// const Page = ({start}) => 
//   <div>
//     next start :{start}
//   </div>

// Page.getInitialProps = async({req}) => {
//   const res = await fetch('https://api.github.com/repos/zeit/next.js')
//   const json = await res.json()
//   return {start:json.stargazers_count }
// }

// export default Page


import Header from '../../component/header'
import FetchData from  './fetch-data'
import Link from 'next/link'
import Router from 'next/router'

// 拦截器
// Router.beforePopState(({url,as,options}) => {
//   if(as !== '/' || as !== '/other'){
//     window.location.href = as
//     return false
//   }
//   return true
// })

export default class App extends React.Component{
  handler = () =>{
    Router.push({
      pathname:'/about',
      query:{name:'params here'}
    })
  }
  render(){
    return (
      <div>
        <Header />
        <p>
          <Link href={{pathname:'/fetch-data',query:{name:'next'}}}>
            <a>go to fetch-data page</a>
          </Link>
        </p>
        <p>
          <button onClick={this.handler}>hrer to go about</button>
        </p>
      </div>
    )
  }
}