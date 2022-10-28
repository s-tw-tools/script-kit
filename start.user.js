// ==UserScript==
// @name         Toolkit
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  watch the skills
// @author       s-tw-tools
// @include      http*://*.the-west.*/game.php*
// @grant        none
// ==/UserScript==

function loadScript(scriptUrl){
    (function(document, tag) {
        let scriptTag = document.createElement(tag), 
        firstScriptTag = document.getElementsByTagName(tag)[0]; 
        scriptTag.src = scriptUrl; 
        firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag); 
    }(document, 'script'));
}
loadScript("https://s-tw-tools.github.io/script-kit/basicTools.js")
