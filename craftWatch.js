(async function() {
    CharacterWindow.open('crafting');
    CharacterWindow.window.destroy()
    if(Character.professionId == 1) { 
        new ReceipeWatchDog(52524000);
    }
    if(Character.professionId == 2){ 
        new ReceipeWatchDog(52523000);
    }
    if(Character.professionId == 3){
        new ReceipeWatchDog(52526000);
    }
    if(Character.professionId == 4){
        new ReceipeWatchDog(52525000);
    }
})();

function ReceipeWatchDog(id){
    this.id = id;
    this.canCraft = function(){
        try {
            if(this.areEnoughItemsInInventory())
                return (Crafting.recipes[this.id].last_craft == null) || (Crafting.recipes[this.id].last_craft >= Crafting.recipes[this.id].blocktime);
        } catch (err) {}
        return false;
    }

    this.areEnoughItemsInInventory = function(){
        let result = true;
        Crafting.recipes[this.id].resources.forEach(function(ingredient){
            if(Bag.getItemCount(ingredient.item) < ingredient.count)
                result = false;
        })
        return result;
    }

    this.start = async function() {
        await TSK.sleep(1 + Math.random()*60);
        while(true){
            await TSK.sleep(5 + Math.random()*30);
            if(this.canCraft()){
                TSK.playSound()
                TSK.showMessage("Crafting", 15)
                return;
            }
        }
    }

    this.start();
}
