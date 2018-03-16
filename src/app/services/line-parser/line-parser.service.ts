import { Injectable } from '@angular/core';

@Injectable()
export class LineParserService {

  private LINE_FORMAT = "(x[1-4](?: elite)?) (.*)";
  private ACTIONS = ['attack','move','heal','range','target','pierce','heal','shield','retaliate'];
  private ACTION_REGEX = "(\\$(attack|move|heal|range|target|pierce|heal|shield|retaliate|loot)\\$) ([\\+|-])?(\\d+)";

  private KEYWORDS = {
    "BASE":          "<span class='$lineSize$'>$base$</span>",
    "ELITE":         "<span class='elite'>$eliteValue$</span>",
    "$all$":         "<img class='element' src='assets/elements/all.png'>",
    "$aoe$":         "something",
    "$attack$":      "Attack <img src='assets/icons/attack.png'>$value$",
    "$bless$":       "BLESS <img src='assets/icons/bless.png'>",
    "$consume$":     "something",
    "$curse$":       "CURSE <img src='assets/icons/curse.png'>",
    "$dark$":        "<img class='element' src='assets/elements/dark.png'>",
    "$earth$":       "<img class='element' src='assets/elements/earth.png'>",
    "$fire$":        "<img class='element' src='assets/elements/fire.png'>",
    "$fly$":         "<img src='assets/icons/fly.png'>",
    "$heal$":        "Heal <img src='assets/icons/heal.png'>$value$",
    "$ice$":         "<img class='element' src='assets/elements/ice.png'>",
    "$immobilize$":  "IMMOBILIZE <img src='assets/icons/immobilize.png'>",
    "$invisible$":   "INVISIBLE <img src='assets/icons/invisible.png'>",
    "$jump$":        "<img src='assets/icons/jump.png'>",
    "$light$":       "<img class='element' src='assets/elements/light.png'>",
    "$loot$":        "Loot <img src='assets/icons/loot.png'>$value$",
    "$move$":        "Move <img src='assets/icons/move.png'>$value$",
    "$muddle$":      "MUDDLE <img src='assets/icons/muddle.png'>",
    "$pierce$":      "PIERCE <img src='assets/icons/muddle.png'>",
    "$poison$":      "POISON <img src='assets/icons/poison.png'>",
    "$pull$":        "Pull <img src='assets/icons/pull.png'>$value$",
    "$push$":        "Push <img src='assets/icons/pull.png'>$value$",
    "$range$":       "Range <img src='assets/icons/range.png'>$value$",
    "$retaliate$":   "Retaliate <img src='assets/icons/retaliate.png'>",
    "$shield$":      "Shield <img src='assets/icons/shield.png'>$value$",
    "$strengthen$":  "STRENGTHEN <img src='assets/icons/strengthen.png'>",
    "$stun$":        "STUN <img src='assets/icons/stun.png'>",
    "$target$":      "Target <img src='assets/icons/target.png'>$value$",
    "$wind$":        "<img class='element' src='assets/elements/wind.png'>",
    "$wound$":       "WOUND <img src='assets/icons/wound.png'>"
  };

  constructor() { }

  parseCurrentCard(card, monster) {
    let initiative = card[0];
    let shuffle = card[1];
    let parsedLines = [];
    for (let i = 2; i < card.length; i++) {
      parsedLines.push(this.parseLine(card[i], monster));
    }

    return parsedLines;
  }

  parseLine(cardLine, monster) {
    let re = new RegExp(this.LINE_FORMAT, "g");
    let parsed = re.exec(cardLine);

    let lineSize = parsed[1];
    let line = parsed[2];
    let parsedLine;

    // Basic action; get monster's stats and put both normal and elite number
    line = this.checkForActions(line, monster);

    // Find and replace the rest of the keywords
    let reKeywords = /\$([^\$]*)\$/g;
    let foundKeyword;

    while (foundKeyword = reKeywords.exec(line)) {
      line = line.replace(foundKeyword[0], this.KEYWORDS[foundKeyword[0]]);
    }

    // Generate final Span
    return this.KEYWORDS['BASE'].replace('$base$', line)
      .replace(/\$lineSize\$/g, lineSize);
  }

  checkForActions(line, monster) {
    let re = new RegExp(this.ACTION_REGEX, "g");
    let parsedLine;

    // Basic action; get monster's stats and put both normal and elite number
    while (parsedLine = re.exec(line)){
      if (this.ACTIONS.includes(parsedLine[2])) {
        let value = monster.normalStats[parsedLine[2]] ? monster.normalStats[parsedLine[2]] : parseInt(parsedLine[4]);
        let eliteValue = monster.eliteStats[parsedLine[2]] ? monster.eliteStats[parsedLine[2]] : parseInt(parsedLine[4]);

        if (parsedLine[3] === '+') {
          value += parseInt(parsedLine[4]);
          eliteValue += parseInt(parsedLine[4]);
        } else if (parsedLine[3] === '-'){
          value -= parseInt(parsedLine[4]);
          eliteValue += parseInt(parsedLine[4]);
        }

        if (eliteValue != value) {
          value = value + " / " + this.KEYWORDS['ELITE'].replace('$eliteValue$', eliteValue);
        }

        line = line.replace(parsedLine[0], this.getAction(parsedLine[1], value));
      }
    }

    return line;
  }

  getAction(action, value) {
    let line = this.KEYWORDS[action];

    return value ? line.replace('$value$', value) : line;
  }

  parseAttributes(monster) {
    let normalAttributes = monster.normalStats.attributes;
    let eliteAttributes = monster.eliteStats.attributes;

    if (!normalAttributes || !eliteAttributes || (normalAttributes.length <= 0 && eliteAttributes.length <= 0)) {
      return null;
    }

    let lines = [this.parseLine("x1 Attributes", monster)];
    let normal = [];
    let elite = [];

    normalAttributes.forEach(x => normal.push(x));
    eliteAttributes.forEach(x => elite.push(x));

    normal.length > 0 && lines.push(this.parseLine("x2 " + normal.join(", "), monster));
    elite.length > 0 && lines.push(this.parseLine("x2 elite " + elite.join(", "), monster));

    return lines;
  }

}
