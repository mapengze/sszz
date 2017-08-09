import React from 'react'
import { Icon } from 'antd'
import styles from './index.less'

const Error = () => <div className="content-inner">
  <div className={styles.error}>
    <Icon type="frown-o" />
    <h1>这是易通商城首页</h1>
    <h1 style={{color:'red'}}>abcdefghigkmlnopqrstuvwxyz</h1>
  </div>
</div>

export default Error
