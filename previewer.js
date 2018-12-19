(function (w, d, tag, src, factory) {
  'use strict;'

  var head = document.head || document.getElementsByTagName('head')[0];
  /* Create script tag to load tippyjs */
  var newElem = d.createElement(tag);
  var firstScriptElem = d.getElementsByTagName(tag)[0];
  newElem.async = 1;
  newElem.src = src;
  firstScriptElem.parentNode.insertBefore(newElem, firstScriptElem);
  
  var styles = ".tippy-tooltip.previewer-theme{background-color:#f5f5f5;border:.5px solid #EFEFEF;padding:1px}.tippy-popper[x-placement^=top] .tippy-tooltip.previewer-theme .tippy-arrow{border-top-color:#f5f5f5}.tippy-popper[x-placement^=bottom] .tippy-tooltip.previewer-theme .tippy-arrow{border-bottom-color:#f5f5f5}.tippy-popper[x-placement^=left] .tippy-tooltip.previewer-theme .tippy-arrow{border-left-color:#f5f5f5}.tippy-popper[x-placement^=right] .tippy-tooltip.previewer-theme .tippy-arrow{border-right-color:#f5f5f5;fill:#f5f5f5}.tippy-tooltip.previewer-theme .tippy-roundarrow{fill:#f5f5f5}"
  /* Create style tag to load custom css */
  tag = 'style';
  newElem = d.createElement(tag);
  newElem.type = 'text/css';
  var firstStyleElem = d.getElementsByTagName(tag)[0];
  newElem.appendChild(document.createTextNode(styles));
  
  if (!firstStyleElem) head.appendChild(newElem);
  else firstStyleElem.parentNode.insertBefore(newElem, firstStyleElem);

  if (w) {
    factory(w);
  }
})(window, document, 'script', 'https://unpkg.com/tippy.js@3/dist/tippy.all.min.js', function (window) {
  var API_KEY = null;

  var previewer = {
    init: function (options) {
      options = options || {};
      var opts = options.defaults || {};
      API_KEY = options.API_KEY;
      tippy.setDefaults(opts);
      this.bind(options.selector);
    },

    bind: function (selector) {
      var INITIAL_CONTENT = '<i style="color:black;padding:2px;">Loading...</i>'

      var state = {
        isFetching: false,
        canFetch: true
      }
      var nodesToBind = typeof selector === 'string' ? document.querySelectorAll(selector) : selector;
      var host = 'linkpreview.org';
      var API = 'http://' + host + '/preview/v1/scraper?api_key=' + API_KEY;

      tippy(nodesToBind, {
        content: INITIAL_CONTENT,
        interactive: true,
        sticky: false,
        animateFill: false,
        shouldPopperHideOnBlur: false,
        arrow: true,
        theme: 'previewer',
        onShow: function (tip) {
          if (state.isFetching || !state.canFetch) return

          state.isFetching = true
          state.canFetch = false

          var href = tip.reference.href;
          if (!href) return;
          var format = 'html';
          var url = API + '&url=' + href + '&format=' + format;

          fetch(url)
          .then(function (res) {
            return res.json();
          })
          .then(function (json) {
            console.log(json);
            if (tip.state.isVisible) {
              tip.setContent(json.html);
            }

            state.isFetching = false
          })
          .catch(function (error) {
            tip.setContent('Fetch failed. ' + e);
            state.isFetching = false;
          });           
        },
        onHidden: function (tip) {
          state.canFetch = true
          tip.setContent(INITIAL_CONTENT)
        }
      })
    }
  };
  window.previewer = previewer;
  return previewer;
});