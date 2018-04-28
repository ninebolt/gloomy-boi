import { Injectable } from '@angular/core';

@Injectable()
export class LineParserService {

  private ACTIONS = ['attack', 'move', 'heal', 'loot', 'range', 'target', 'pierce', 'heal', 'shield', 'retaliate', 'push', 'pull'];
  private STATUSES = ['bless', 'curse', 'disarm', 'immobilize', 'invisible', 'muddle', 'poison', 'strengthen', 'stun', 'wound'];
  private AOES = ['aoe-1', 'aoe-1-self-center', 'aoe-1-self-side', 'aoe-triangle', 'aoe-triangle-self',
    'aoe-triangle-large-self', 'aoe-cone-2-self', 'aoe-straight-2', 'aoe-straight-3', 'aoe-straight-5'];
  private ELEMENTS = ['all', 'dark', 'earth', 'fire', 'ice', 'light', 'wind'];

  private LINE_FORMAT_REGEX = '(x[1-4](?: elite)?) (.*)';
  private ACTION_REGEX = '\\$(attack|move|heal|range|target|pierce|heal|shield|retaliate|loot|push|pull)\\$ ?([\\+|-])?(\\d+)?';
  private STATUS_REGEX = '\\$(bless|curse|disarm|immobilize|invisible|muddle|poison|strengthen|stun|wound)\\$';
  private ELEMENT_REGEX = '\\$(all|dark|earth|fire|ice|light|wind)\\$';
  private AOE_REGEX = '\\$(aoe-[^\\$]*)\\$';

  private KEYWORDS = {
    BASE: '<span class="$lineSize$">$base$</span>',
    ELITE: '<span class="elite">$eliteValue$</span>',
    ACTION: '$actionCap$ <img class="icon" src="assets/icons/$action$.png"> $value$',
    AOE: '<img class="aoe" src="assets/icons/$AOE$.png">',
    ELEMENT: '<img class="icon-element" src="assets/elements/$element$.png">',
    STATUS: '$statusCap$ <img class="icon" src="assets/status/$status$.png">',
    $consume$: '<img class="icon-element consume" src="assets/elements/consume.png">',
    $fly$: '<img class="icon" src="assets/icons/fly.png">',
    $jump$: '<img class="icon" src="assets/icons/jump.png">'
  };

  constructor() { }

  parseCurrentCard(card, monster) {
    let parsedLines = [];
    for (let i = 0; i < card.lines.length; i++) {
      parsedLines.push(this.parseLine(card.lines[i], monster));
    }

    return parsedLines;
  }


  parseAttributes(monster) {
    let normalAttributes = monster.normalStats.attributes;
    let eliteAttributes = monster.eliteStats.attributes;

    if (!normalAttributes || !eliteAttributes || (normalAttributes.length <= 0 && eliteAttributes.length <= 0)) {
      return null;
    }

    let lines = [];
    let normal = [];
    let elite = [];

    normalAttributes.forEach(x => normal.push(x));
    eliteAttributes.forEach(x => elite.push(x));

    normal.length > 0 && lines.push(this.parseLine('x2 ' + normal.join(', '), monster));
    elite.length > 0 && lines.push(this.parseLine('x2 elite ' + elite.join(', '), monster));

    return lines;
  }

  parseLine(cardLine, monster) {
    let re = new RegExp(this.LINE_FORMAT_REGEX, 'g');
    let parsed = re.exec(cardLine);

    let lineSize = parsed[1];
    let line = parsed[2];
    let parsedLine;

    // Basic action; get monster's stats and put both normal and elite number
    line = this.checkForActions(line, monster);

    // Status effects; replace the current status effect
    line = this.checkForStatuses(line);

    // AoE elements; replace AoE tag with image
    line = this.checkForAoE(line);

    // Elements; replace elements with image(s)
    line = this.checkForElements(line);

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

  private checkForActions(line, monster) {
    let re = new RegExp(this.ACTION_REGEX, 'g');
    let parsedLine;

    // Basic action; get monster's stats and put both normal and elite number
    while (parsedLine = re.exec(line)) {
      if (this.ACTIONS.includes(parsedLine[1])) {
        console.log('PARSED LINES: ', parsedLine);
        let value = parsedLine[3] || '';
        let eliteValue = parsedLine[3] || '';
        // MATT THIS IS WHAT I DID
        let stringVal = '';

        if (value && parsedLine[2] === '+') {
          value = monster.normalStats[parsedLine[1]] + parseInt(parsedLine[3]);
          eliteValue = monster.eliteStats[parsedLine[1]] + parseInt(parsedLine[3]);
        } else if (value && parsedLine[2] === '-') {
          value = monster.normalStats[parsedLine[1]] - parseInt(parsedLine[3]);
          eliteValue = monster.eliteStats[parsedLine[1]] - parseInt(parsedLine[3]);
        }

        if (eliteValue !== value) {
          stringVal = value + ' / ' + this.KEYWORDS['ELITE'].replace('$eliteValue$', eliteValue.toString());
        } else {
          stringVal = value.toString();
        }

        line = line.replace(parsedLine[0], this.getAction(parsedLine[1], stringVal));
      }
    }

    return line;
  }

  private getAction(action, value) {
    let line = this.KEYWORDS['ACTION']
      .replace('$actionCap$', action.charAt(0).toUpperCase() + action.slice(1))
      .replace('$action$', action);

    return line.replace('$value$', value ? value : '');
  }

  private checkForStatuses(line) {
    let re = new RegExp(this.STATUS_REGEX, 'g');
    let parsedLine;

    while (parsedLine = re.exec(line)) {
      if (this.STATUSES.includes(parsedLine[1])) {
        line = line.replace(parsedLine[0],
          this.KEYWORDS['STATUS']
            .replace('$statusCap$', parsedLine[1].toUpperCase())
            .replace('$status$', parsedLine[1]));
      }
    }

    return line;
  }

  private checkForAoE(line) {
    let re = new RegExp(this.AOE_REGEX, 'g');
    let parsedLine;

    while (parsedLine = re.exec(line)) {
      if (this.AOES.includes(parsedLine[1])) {
        line = line.replace(parsedLine[0],
          this.KEYWORDS['AOE']
            .replace('$AOE$', parsedLine[1]));
      }
    }

    return line;
  }

  private checkForElements(line) {
    let re = new RegExp(this.ELEMENT_REGEX, 'g');
    let parsedLine;

    while (parsedLine = re.exec(line)) {
      if (this.ELEMENTS.includes(parsedLine[1])) {
        line = line.replace(parsedLine[0],
          this.KEYWORDS['ELEMENT']
            .replace('$element$', parsedLine[1]));
      }
    }

    return line;
  }

}
