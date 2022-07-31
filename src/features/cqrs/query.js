import config from './config';
import stringify from 'qs/lib/stringify'
// import throttlePromise from './utils/throttlePromise';



export const stringifyUrl = (path = '', params = {}) => {
  // const origin = config.origin || import.meta.env.VITE_API_ORIGIN || 'http://httpbin.org/anything'
  // let uri = path.includes('://') ? path : origin.replace(/\/$/, '') + path

  let uri = path

  if(typeof params === 'object'){
    uri += (uri.includes('?') ?'&':'?') + stringify(params)
  }
  return uri.toString()
}

export default (path, params = null) => {
  const url = stringifyUrl(path, params);
  return config.getRequest(url);
  // return throttlePromise(query(url, params));
};



