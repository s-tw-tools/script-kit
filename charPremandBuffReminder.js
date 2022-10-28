(function() {

    (async function() {
        await TSK.sleep(5);
        monitorFortBattles();
        if(isLongTimerActive())
            return
        if(await isQuestAvailable())
            showMessage("Du kannst Charakterpremium bei Angus abholen");
    })();

    function isLongTimerActive(){
        return new Date(Premium.endTimes.character * 1000) > new Date(new Date() -1  + 1000 * 60 * 60 * 24 * 14);
    }
    function isLongTimerActiveNow(){
        return new Date(Premium.endTimes.character * 1000) > new Date(new Date() -1  + 1000 * 60 * 60);
    }

    async function isQuestAvailable(){
        let x = await fetch(document.baseURI.split('#')[0] + "?window=quest_employer", {
            "credentials": "include",
            "headers": {
                "User-Agent": navigator.userAgent,
                "Accept": "application/json, text/javascript, */*; q=0.01",
                "Accept-Language": "de,en-US;q=0.7,en;q=0.3",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Requested-With": "XMLHttpRequest",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            },
            "referrer": document.baseURI.split('#')[0],
            "body": "employer=macguffin&x=8254&y=1154",
            "method": "POST",
            "mode": "cors"
        });
        let y = await x.json();
        let z = y.employer.open.filter(function(quest){
            return [3460,3461,3462,3463].includes(quest.id)
        })
        return z.length > 0;
    }


    async function checkBuffs() {
        let request = await fetch(document.baseURI.split('#')[0] + "?window=character&mode=ajax_get_buffs", {
            "credentials": "include",
            "headers": {
                "User-Agent": navigator.userAgent,
                "Accept": "application/json, text/javascript, */*; q=0.01",
                "Accept-Language": "de,en-US;q=0.7,en;q=0.3",
                "X-Requested-With": "XMLHttpRequest",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            },
            "referrer": document.baseURI.split('#')[0],
            "method": "POST",
            "mode": "cors"
        });
        let response = await request.json();
        try {
            if(!isLongTimerActiveNow())
                showMessage("kein Char-PA aktiv")
            if(response.msg.items.weapon_hand == "left_arm")
                return
        } catch(err){}
        await TSK.sleep(10)
            TSK.showMessage("kein Fortkampfbuff eingenommen")
            TSK.playSound();
        }
    }

    async function monitorFortBattles(){
        while(true){
            try {
                if(!document.getElementsByClassName("timer")[0].innerText.includes("h"))
                    checkBuffs()
            } catch(err) {
            }
            await TSK.sleep(500 + Math.random()*500)
        }
    }
})()
