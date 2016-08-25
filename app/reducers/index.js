import { combineReducers } from 'redux';

// Reducers
import postReducer from './post-reducer';
import userReducer from './user-reducer';
import widgetReducer from './widget-reducer';
import searchLayoutReducer from './search-layout-reducer';

// Combine Reducers
var reducers = combineReducers({
    postState: postReducer,
    userState: userReducer,
    widgetState: widgetReducer,
    searchLayoutState: searchLayoutReducer
});

export default reducers;
