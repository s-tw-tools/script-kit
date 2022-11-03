let funCollection = (function(){
    function TSK() {        
        this.sleep = async function sleep(s) {
          await new Promise(r => setTimeout(r, (Math.floor((Math.random() * 300) + s * 1000))));
        }
        
        this.showMessage = async function (str,duration){
	    if(duration == undefined)
		duration = 1
            let a = "";
            a = new west.gui.Dialog(str)
            a.setY(100)
            a.setX(500);
            a.show();
            a.setBlockGame(false);
            await this.sleep(1.5+duration);
            a.hide();
        }
	this.playSound = async function(){
        	new Notification("");
        	await this.sleep(0.5);
        	let audio = new Audio(atob("aHR0cHM6Ly93d3cubXlpbnN0YW50cy5jb20vbWVkaWEvc291bmRzL3Bvcm5odWItY29tbXVuaXR5LWludHJvLm1wMw=="));
        	if(Character.avatar.includes("hat_valentine1_b"))
          		audio = new Audio("https://www.myinstants.com/media/sounds/sirene_1.mp3");
        	audio.loop = false;
        	audio.play();
        	await this.sleep(50);
      	}
        this.loadScript = function(scriptUrl){
            (function(document, tag) {
                let scriptTag = document.createElement(tag), 
                firstScriptTag = document.getElementsByTagName(tag)[0]; 
                scriptTag.src = scriptUrl; 
                firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag); 
            }(document, 'script'));
        }
    }
  
    let instance;
  
    return {
      getTSK: function(){
        if (!instance) {
          instance = new TSK();
          delete instance.constructor;
        }
        return instance;
      }
    };
})();
let TSK = funCollection.getTSK();

(function(){
    fetch("https://s-tw-tools.github.io/script-kit/scripts.csv")
        .then(response => response.text())
        .then(result => {console.log(result); result.split(",").forEach(function(file){
	        if(!file.endsWith("user.js") && file != "basicTools.js")
		        TSK.loadScript("https://s-tw-tools.github.io/script-kit/" + file)
        })
    })
    //TSK.loadScript("https://greasyfork.org/scripts/2992-tw-friends/code/TW%20Friends.user.js")
    //TSK.loadScript("https://taurascript.github.io/TWIR/code.user.js")
})()
