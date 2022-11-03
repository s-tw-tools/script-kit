(function () {
  var icon = $('<div></div>')
    .attr({
      class: 'menulink',
      title: 'TW Skill Watcher',
    })
    .css({
      'background': 'url(https://i.imgur.com/ivxW1vX.png)',
      'background-position': '0px 0px',
    })
    .mouseleave(function () {
      $(this).css('background-position', '0px 0px');
    })
    .mouseenter(function (e) {
      $(this).css('background-position', '25px 0px');
    })
    .click(function () {
      WSW.loadAllSkills() 
      openWSWWindow();
    });
  var bottom = $('<div></div>').attr({
    class: 'menucontainer_bottom',
  });
  $('#ui_menubar .ui_menucontainer:last').after(
    $('<div></div>')
      .attr({
        class: 'ui_menucontainer',
        id: 'WSW',
      })
      .append(icon)
      .append(bottom)
  );
  function openWSWWindow() {
  if (!document.getElementById('WSWstyle')) {
    const css = `.cell.cell_0.name{width:100%;margin-bottom:5px;font-size:14px}.skillName{width:50%}.skillVal{width:50%}`;
    const style = document.createElement('style');
    style.innerHTML = css;
    style.id = 'WSWstyle';
    document.head.appendChild(style);
  }

  const content = $('<div style="padding:10px;"></div>');
  const button = new west.gui.Button('Search Player');

  const results = $('<div></div>');

  button.click(async function () {
    const player111 = prompt(
      'Player: ',
    );
    if (player111 === null) {
      return;
    }

    results.html('Loading...');

    const table = new west.gui.Table();

    table
      .addColumn('name', 'name')
      .addColumn('skillName', 'skillName')
      .addColumn('skillVal', 'skillVal')
      .addColumn('skillName2', 'skillName')
      .addColumn('skillVal2', 'skillVal')
      .appendToCell(
        'head',
        'name',
        'Name: ' + player111 + '<br>'
      )
      .appendToCell('head', 'skillName', 'Skill Name')
      .appendToCell('head', 'skillVal', 'Skill Value')
      .appendToCell('head', 'skillName2', 'Skill Name')
      .appendToCell('head', 'skillVal2', 'Skill Value');

    while(WSW.data.tactic == undefined)
      await TSK.sleep(3)
    
    const skills = new PlayerSkills(player111).data
      table
        .appendRow()
        .appendToCell(-1, 'skillName', "strength")
        .appendToCell(-1, 'skillVal', skills.strength)
        .appendToCell(-1, 'skillName', "health")
        .appendToCell(-1, 'skillVal', skills.health);
      table
        .appendRow()
        .appendToCell(-1, 'skillName', "flexibility")
        .appendToCell(-1, 'skillVal', skills.flexibility)
        .appendToCell(-1, 'skillName', "punch")
        .appendToCell(-1, 'skillVal', skills.punch);
      table
        .appendRow()
        .appendToCell(-1, 'skillName', "dexterity")
        .appendToCell(-1, 'skillVal', skills.dexterity)
        .appendToCell(-1, 'skillName', "shot")
        .appendToCell(-1, 'skillVal', skills.shot);
      table
        .appendRow()
        .appendToCell(-1, 'skillName', "charisma")
        .appendToCell(-1, 'skillVal', skills.charisma)
        .appendToCell(-1, 'skillName', "tough")
        .appendToCell(-1, 'skillVal', skills.tough);
    
      table
        .appendRow()
        .appendToCell(-1, 'skillName', "leadership")
        .appendToCell(-1, 'skillVal', skills.leadership)
        .appendToCell(-1, 'skillName', "reflex")
        .appendToCell(-1, 'skillVal', skills.reflex);
      table
        .appendRow()
        .appendToCell(-1, 'skillName', "trade")
        .appendToCell(-1, 'skillVal', skills.trade)
        .appendToCell(-1, 'skillName', "appearance")
        .appendToCell(-1, 'skillVal', skills.appearance);
      table
        .appendRow()
        .appendToCell(-1, 'skillName', "build")
        .appendToCell(-1, 'skillVal', skills.build)
        .appendToCell(-1, 'skillName', "tactic")
        .appendToCell(-1, 'skillVal', skills.tactic);
    

    window.t = table;
    window.tu = () => {
      const html = table.getMainDiv();
      results.html(html);
    };

    const html = table.getMainDiv();

    results.html(html);
  });

  const buttonHtml = button.getMainDiv();

  content.append(buttonHtml);
  content.append(results);

  wman
    .open('west-WSW', null, 'west-WSW')
    .setSize(700, 450)
    .setTitle('West Skill Watcher')
    .setMiniTitle('WSW')
    .appendToContentPane(content);
}
})()
