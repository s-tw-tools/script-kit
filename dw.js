let dwCollection = (function(){
    function DW() {      
      this.block = true
      
      this.isBlocked = async function (){
        while(block)
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
           await this.playSound();
        await TSK.sleep(10);
        }
      }
      this.requestPermission = async function(){
        await Notification.requestPermission();
      }
      this.playSound = async function(){
        new Notification("Duell incoming");
        await TSK.sleep(0.5);
        let audio = new Audio(atob("aHR0cHM6Ly93d3cubXlpbnN0YW50cy5jb20vbWVkaWEvc291bmRzL3Bvcm5odWItY29tbXVuaXR5LWludHJvLm1wMw=="));
        if(Character.avatar.includes("hat_valentine1_b"))
          audio = new Audio("https://www.myinstants.com/media/sounds/sirene_1.mp3");
        audio.loop = false;
        audio.play();
        await TSK.sleep(50);
      }
      this.switchState = function(){
        if(this.block)
          TSK.showMessage("warner enabled")
        else
          TSK.showMessage("warner disabled")
        this.block != this.block
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
let DW = dwCollection.getDW()

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
