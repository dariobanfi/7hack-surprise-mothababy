  // These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HomePage/reducer'),
          import('containers/HomePage/sagas'),
          import('containers/HomePage')
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('home', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/confirmation',
      name: 'confirmation',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/ConfirmationPage/reducer'),
          import('containers/ConfirmationPage/sagas'),
          import('containers/ConfirmationPage'),
        ]);

        const renderRoute = loadModule(cb);
        importModules.then(([reducer, sagas, component]) => {
          injectReducer('confirmation', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component)
        });

        importModules.catch(errorLoading)
      },
     }, {
       path: '/summary',
       name: 'summary',
       getComponent(nextState, cb) {
         const importModules = Promise.all([
           import('containers/SummaryPage/reducer'),
           import('containers/SummaryPage/sagas'),
           import('containers/SummaryPage'),
         ]);

         const renderRoute = loadModule(cb);
         importModules.then(([reducer, sagas, component]) => {
           injectReducer('summary', reducer.default);
           injectSagas(sagas.default);
           renderRoute(component)
         });

         importModules.catch(errorLoading)
       },
      }, {
      path: '/destination',
      name: 'destination',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Destination/reducer'),
          import('containers/Destination')
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('destination', reducer.default)
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/holiday',
      name: 'holiday',
      getComponent(nextState, cb) {
        import('containers/Holiday')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
