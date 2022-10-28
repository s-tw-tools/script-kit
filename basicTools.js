let functionCollection = (function(){
    function TSK() {        
        this.sleep = async function sleep(s) {
          await new Promise(r => setTimeout(r, (Math.floor((Math.random() * 300) + s * 1000))));
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
