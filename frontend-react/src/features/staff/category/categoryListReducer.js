export const SLICE_NAME = 'categoryList';

export const Action = {
  SET_STATE: 'setState'
}

const initialState = {
  items: [],    
  keyword: '',
  page: 1,
  total: 0,
  loading: true,
  error: ''
}

const reducer = (state=initialState, action) => {
  let actionName = action.type ?? '';

  if(actionName.startsWith(SLICE_NAME + '/')){
    actionName = actionName.substring(1 + SLICE_NAME.length);
  }else {
    actionName = null;
  }

  if(actionName === Action.SET_STATE) {
    return {...state, ...action.payload};
  }

  return state;
}

export default reducer;