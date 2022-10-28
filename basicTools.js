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
            await sleep(1.5);
            a.hide();
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
