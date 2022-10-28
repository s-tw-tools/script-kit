let functionCollection = (function(){
    function TSK() {        
        this.sleep = async function sleep(s) {
          await new Promise(r => setTimeout(r, (Math.floor((Math.random() * 300) + s * 1000))));
        }
        
        this.showMessage = async function (str){
            let a = "";
            a = new west.gui.Dialog(str)
            a.setY(100)
            a.setX(500);
            a.show();
            a.setBlockGame(false);
            await this.sleep(1.5);
            a.hide();
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
let TSK = functionCollection.getTSK();

(function(){
    fetch("https://s-tw-tools.github.io/script-kit/scripts.csv")
        .then(response => response.text())
        .then(result => {console.log(result); result.split(",").forEach(function(file){
	        if(!file.endsWith("user.js") && file != "basicTools.js")
		        TSK.loadScript("https://s-tw-tools.github.io/script-kit/" + file)
        })
   })
})()
