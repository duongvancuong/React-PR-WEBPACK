import React  from 'react';
import Loadable from 'react-loadable';

import LoadingSpinner from './components/LoadingSpinner';

const LoadableComponent = (url) => Loadable({
  loader: () => import('' + url),
  loading: LoadingComp,
  delay: 300
});

const LoadingComp = (props) => {
  if (props.error) {
    return <div>Error! <button onClick={ props.retry }>Retry</button></div>;
  } else {
    return <LoadingSpinner />;
  }
}


const routes = [
  {
    'name': 'Home',
    'path': '/',
    'component': LoadableComponent('./App'),
    'exact': true,
    'isRequireAuthenticated': false
  },
  // {
  //   'name': 'Library',
  //   'path': '/library',
  //   'component': LoadableComponent('./modules/MediaGalleryPage'),
  //   'isRequireAuthenticated': false
  // },
];

export default routes;
