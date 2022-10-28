let dwCollection = (function(){
    function DW() {      
      this.block = true
      
      this.isBlocked = async function (){
        while(this.block)
          await TSK.sleep(5)
      }
      
      this.refreshMap = async function(){
        await this.isBlocked();
        Map.center(Character.position.x, Character.position.y,true,true)
        await TSK.sleep(Math.floor(Math.random()*300+250));
        this.refreshMap();
      }
      
      this.checkPosition = async function(){
        await TSK.sleep(5);
        while(true){
          await this.isBlocked();
        if(document.getElementsByClassName("people posy-" + Character.position.y + " posx-" + Character.position.x).length > 0)
           await TSK.playSound();
        await TSK.sleep(10);
        }
      }
      this.requestPermission = async function(){
        await Notification.requestPermission();
      }

      this.switchState = function(){
        if(this.block)
          TSK.showMessage("warner enabled")
        else
          TSK.showMessage("warner disabled")
        this.block = !this.block
      }

      
    }
  
    let instance;
  
    return {
      getDW: function(){
        if (!instance) {
          instance = new DW();
          instance.requestPermission();
          instance.checkPosition()
          instance.refreshMap()
          delete instance.constructor;
        }
        return instance;
      }
    };
})();

let DW = 0;

(function() {
  var icon = $('<div></div>')
    .attr({
      class: 'menulink',
      title: 'warn me',
    })
    .css({
      'background': 'url(https://i.imgur.com/gVYejEp.png)',
      'background-position': '0px 0px',
      'background-repeat': 'no-repeat'
    })
    .mouseleave(function () {
      $(this).css('background-position', '0px 0px');
    })
    .mouseenter(function (e) {
      $(this).css('background-position', '2px 2px');
    })
    .click(function () {
      if(DW == 0)
        DW = dwCollection.getDW();
      DW.switchState();
    });
  var bottom = $('<div></div>').attr({
    class: 'menucontainer_bottom',
  });
  $('#ui_menubar .ui_menucontainer:last').after(
    $('<div></div>')
      .attr({
        class: 'ui_menucontainer',
        id: 'warnMe',
      })
      .append(icon)
      .append(bottom)
  );
})()
