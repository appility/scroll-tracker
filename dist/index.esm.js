window.ScrollTracker={trackScroll:function(n){var e,t,o,r=function(n,e){var t=new Set;return function(){var o=(window.scrollY+window.innerHeight)/document.documentElement.scrollHeight*100;n.forEach((function(n){o>=n&&!t.has(n)&&(window.dispatchEvent(new CustomEvent("scrollProgress",{detail:{percentage:n}})),t.add(n),e(n))}))}}(n,(function(){return null}));window.addEventListener("scroll",(e=r,t=200,function(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];clearTimeout(o),o=window.setTimeout((function(){return e.apply(void 0,n)}),t)}))}};
