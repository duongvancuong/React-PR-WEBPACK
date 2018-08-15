import React, { PureComponent } from 'react'

import './style.scss'

export default class PageNotFound extends PureComponent {
  render() {
    return (
      <div class="box">
        <div>
          close !
        </div>
        <p><span>error 404 !</span> sorry page isn't found for one of the reformes </p>
      </div>
    )
  }
}
