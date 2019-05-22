import App ,{Container} from 'next/app'
import Router,{withRouter} from 'next/router'

class MyApp extends App{
  render(){
    const {Component,router,pageProps} = this.props;
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    )
  }
}

export default withRouter(MyApp);