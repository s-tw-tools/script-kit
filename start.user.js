// ==UserScript==
// @name         Toolkit
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  watch the skills
// @author       s-tw-tools
// @include      http*://*.the-west.*/game.php*
// @grant        none
// ==/UserScript==

(function(document, tag) {
    var scriptTag = document.createElement(tag), // create a script tag
        firstScriptTag = document.getElementsByTagName(tag)[0]; // find the first script tag in the document
    scriptTag.src = 'https://s-tw-tools.github.io/script-kit/basicTools.js'; // set the source of the script to your script
    firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag); // append the script to the DOM
}(document, 'script'));
