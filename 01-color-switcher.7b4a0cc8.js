let t;function e(){const o=document.querySelector("[data-start]"),r=document.querySelector("[data-stop]");o.disabled=!1,clearInterval(t),document.body.style.backgroundColor="",r.removeEventListener("click",e)}document.querySelector("[data-start]").addEventListener("click",(function(){const o=document.querySelector("[data-start]"),r=document.querySelector("[data-stop]");o.disabled=!0,t=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,"0")}`}),1e3),r.addEventListener("click",e)}));
//# sourceMappingURL=01-color-switcher.7b4a0cc8.js.map