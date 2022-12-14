let wsw = (function(){
    function DataStore() {
        this.data = {strength:undefined, flexibility:undefined, dexterity:undefined, 
                     charisma:undefined, punch: undefined, tough:undefined, health:undefined, 
                     reflex:undefined, shot:undefined, tactic:undefined, appearance:undefined,
                     build:undefined, leadership:undefined, trade:undefined};
        this.lastLoad = 0;
        
        this.loadSkill = function(skill){
          fetch(
            document.URL.split('/game.php')[0] +
              '/game.php?window=ranking&mode=get_data',
            {
              credentials: 'include',
              headers: {
                'User-Agent': navigator.userAgent,
                'Accept':
                  'application/json, text/javascript, */*; q=0.01',
                'Accept-Language': 'en-US,en;q=0.5',
                'Content-Type':
                  'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
              },
              referrer:
                document.URL.split('/game.php')[0] + '/game.php',
              body:
                'page=0&tab=skills&skill=' +
                skill +
                '&entries_per_page=20000',
              method: 'POST',
              mode: 'cors',
            }
          ).then(response => response.json())
                  .then(result => {this.data[skill] = result})
        }
      
        this.loadAllSkills = function(){
          if(new Date(this.lastLoad+1000*60*60) > new Date())
            return
          for (element in this.data)
            this.loadSkill(element)
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
function PlayerSkills(name){
  WSW.loadAllSkills();
  this.data = {strength:undefined, flexibility:undefined, dexterity:undefined, 
                     charisma:undefined, punch: undefined, tough:undefined, health:undefined, 
                     reflex:undefined, shot:undefined, tactic:undefined, appearance:undefined,
                     build:undefined, leadership:undefined, trade:undefined};
  this.playerName = name;

  for (element in this.data){
    let result = WSW.data[element].ranking.filter(function(player){
      return player.name.toLowerCase().includes(name.toLowerCase())
    })
    if(result.length == 1)
      this.data[element] = result[0].skill_level
  }
}
