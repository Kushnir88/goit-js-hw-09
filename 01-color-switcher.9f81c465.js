!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=null;function a(){t.disabled=!1,e.disabled=!0,clearInterval(n),e.removeEventListener("click",a)}e.disabled=!0,t.addEventListener("click",(function(){t.disabled=!0,e.disabled=!1,n=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,"0"))}),1e3),e.addEventListener("click",a)}))}();
//# sourceMappingURL=01-color-switcher.9f81c465.js.map
