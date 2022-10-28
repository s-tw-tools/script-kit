let walkerCollection = (function(){
    function Singleton() {      
      
      this.createButton = function() {
        var icon = $('<div></div>')
          .attr({
            class: 'menulink',
            title: 'Wooosh!',
          })
          .css({
            'background': 'url(https://westde.innogamescdn.com/images/icons/turtle.png)',
            'background-position': '2px 6px',
            'background-repeat': 'no-repeat'
          })
          .mouseleave(function () {
            $(this).css('background-position', '2px 6px');
          })
          .mouseenter(function (e) {
            $(this).css('background-position', '5px 9px');
          })
          .click(function () {
            walkerCollection.instance().switchPosition()
          });
        var bottom = $('<div></div>').attr({
          class: 'menucontainer_bottom',
        });
        $('#ui_menubar .ui_menucontainer:last').after(
          $('<div></div>')
            .attr({
              class: 'ui_menucontainer',
              id: 'TUUUUUUURTLE',
            })
          .append(icon)
          .append(bottom)
        );
      }
      
      this.startWalk = async function (fortId){
          let old = Wear.get("animal")
          await TSK.sleep(0.01);
          Wear.carry(Bag.getItemByItemId(699000))
          TaskQueue.add(TaskWalk(fortId,"fort"))
          await TSK.sleep(1.1);
          Wear.carry(old)
      }
      this.switchPositionW10 = async function(){
          if(Character.position.x > 20000)
            this.startWalk(144);
          else
            this.startWalk(158);
      }
      this.switchPositionFairbanks = async function(){
        if(Character.position.x > 20000)
          this.startWalk(16);
        else
          this.startWalk(8);
      }
      
      this.switchPosition = async function() {
        if(Game.worldName == "Welt 10")
          this.switchPositionW10();
        if(Game.worldName == "Fairbanks")
          this.switchPositionFairbanks();
      }
    }
  
    let instance;
  
    return {
      instance: function(){
        if (!instance) {
          instance = new Singleton();
          if(Bag.getItemCount(699000) > 0){
            instance.createButton();
            delete instance.constructor;
          }
          else
            walkerCollection = undefined
        }
        return instance;
      }
    };
})();
walkerCollection.instance();
