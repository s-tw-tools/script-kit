(async function() {
    async function downTimeChecker(item_id){
        await TSK.sleep(Math.random() * 10 + 5)
        do
            await TSK.sleep(10 + Math.random() * 5)
        while(new Date(Bag.getItemByItemId(item_id).cooldown * 1000) > new Date())
            await TSK.sleep(Math.random() * 1000)
        ItemUse.doIt(item_id)
    }

    downTimeChecker(50691000)
    downTimeChecker(2557000)
    downTimeChecker(2558000)
    downTimeChecker(2698000)
    downTimeChecker(2482000)
    downTimeChecker(51482000)
    downTimeChecker(51483000)
    downTimeChecker(2665000)
    downTimeChecker(2666000)
})();
