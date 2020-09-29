function qs(selector, element = document) {
  return element.querySelector(selector);
}

function qsa(selector, element = document) {
  return Array.from(element.querySelectorAll(selector));
}

function domReady(fn) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn, false);
  } else {
    // dom loaded already
    // document.readyState = 'interactive' || 'complete'
    fn();
  }
}

function getSzidSession() {
  return window.fetch(`${process.env.BASE_URL}/auth/session`, { method: 'GET', credentials: 'same-origin' })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return undefined;
    })
    .then(body => {
      if (body) {
        const { status: loginStatus, session } = body;
  
        return loginStatus === 'loggedIn' ? session : undefined;
      }

      return undefined;
    })
    .catch(() => undefined);
}

export {
  qs,
  qsa,
  domReady
};

