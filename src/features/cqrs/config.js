export default {
  origin: '',
  getRequest: async(url) => (await fetch(url.toString())).json()
};
