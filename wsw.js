let wsw = (function(){
    function DataStore() {
        this.data = {strength:undefined, flexibility:undefined, dexterity:undefined, 
                     charisma:undefined, punch: undefined, tough:undefined, health:undefined, 
                     reflex:undefined, shot:undefined, tactic:undefined, appearance:undefined};
        this.lastLoad = 0;
        
        this.loadSkill = function(skill){
           
        }
      
        this.loadAllSkills = function(){
          if(new Date(lastLoad+1000*60*60) > new Date())
            return
          for (element in this.data)
            loadSkill(element)
          this.lastLoad = new Date()-1;
        }
    }
  
    let instance;
  
    return {
      getDataStorage: function(){
        if (!instance) {
          instance = new DataStore();
          delete instance.constructor;
        }
        return instance;
      }
    };
})();
WSW = wsw.getDataStorage();
