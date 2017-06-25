import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';

const composeEnhancers = composeWithDevTools({
    shouldHotReload:false,
    features: {
        persist: false
    }
})


export const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        reducers,
        {}, // preloaded state
        composeEnhancers(
            applyMiddleware(sagaMiddleware)
        )
    );
    sagaMiddleware.run(sagas);
    return store;
}
