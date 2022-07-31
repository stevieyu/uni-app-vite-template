const prrs = {};
export default (src) =>
  new Promise((resolve, reject) => {
    if (!prrs[src]) prrs[src] = { resolves: [], rejects: [], loading: true };
    if (prrs[src].loading) {
      prrs[src].resolves.push(resolve);
      prrs[src].rejects.push(reject);
    }
    if (document.querySelector(`script[src="${src}"]`)) {
      if (!prrs[src].loading) resolve();
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.type = 'text/javascript';
    s.crossOrigin = 'anonymous';
    s.onload = (...args) => {
      prrs[src].resolves.forEach((i) => i(...args));

      delete prrs[src].resolves;
      delete prrs[src].rejects;
      prrs[src].loading = false;
    };
    s.onerror = (...args) => {
      prrs[src].rejects.forEach((i) => i(...args));

      delete prrs[src].resolves;
      delete prrs[src].rejects;
      prrs[src].loading = false;
    };
    document.head.appendChild(s);
  });
