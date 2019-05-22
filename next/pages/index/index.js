import Link from 'next/link'
import { Fragment } from 'react';
import {Icon} from 'antd';

const Index = () => (
  <Fragment>
    <div>
    <Link href="/blog"><a className="blog-btn"><Icon type="edit" />技术博客</a></Link>
    <Link href="/life"><a className="life-btn">生活记录<Icon type="swap-right" /></a></Link>
    </div>
  </Fragment>
)

export default Index;