import React from 'react';
import ReactDOM from 'react-dom';
import './styles/app.scss';

const title = 'My Minimal React Webpack Babel Setup';

ReactDOM.render(
  <div className="container">{title}</div>,
  document.getElementById('app'),
);

module.hot.accept();
