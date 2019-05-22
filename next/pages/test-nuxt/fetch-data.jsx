import React from 'react'
import fetch from 'isomorphic-unfetch'


// export default class Index extends React.Component {
//   static async getInitialProps({ req }) {
//     const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
//     return { userAgent }
//   }

//   render() {
//     console.log(this.props.userAgent)
//     return (
//       <div>
//         Hello World {this.props.userAgent}
//       </div>
//     )
//   }
// }

const Page = ({ stars }) =>
  <div>
    Next stars: {stars}
  </div>

Page.getInitialProps = async ({ req }) => {
  const res = await fetch('https://api.github.com/repos/zeit/next.js')
  const json = await res.json()
  return { stars: json.stargazers_count }
}

export default Page