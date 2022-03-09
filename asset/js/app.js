class Selectors {
  constructor() {}

  static IDSelector(str, start = document.body) {
    const queue = [start];
    const visited = {};
    visited[start] = true;
    while (queue.length) {
      for (let i = 0; i < queue.length; i++) {
        let parent = queue.shift();
        for (let child of parent.childNodes) {
          if (child.id == str) return child;
          else {
            visited[child] = true;
            queue.push(child);
          }
        }
      }
    }
  }

  static AllclassSelector(str) {
    const start = document.body;
    const queue = [start];
    const visited = {};
    const result = [];
    visited[start] = true;

    while (queue.length) {
      for (let i = 0; i < queue.length; i++) {
        let parent = queue.shift();
        for (let child of parent.childNodes) {
          if (String(child.className).indexOf(str) !== -1) result.push(child);
          else {
            visited[child] = true;
            queue.push(child);
          }
        }
      }
    }
    return result;
  }

  static classSelector(str) {
    const start = document.body;
    const queue = [start];
    const visited = {};
    visited[start] = true;

    while (queue.length) {
      for (let i = 0; i < queue.length; i++) {
        let parent = queue.shift();
        for (let child of parent.childNodes) {
          if (String(child.className).indexOf(str) !== -1) return child;
          else {
            visited[child] = true;
            queue.push(child);
          }
        }
      }
    }
  }
}

class TownGenerator {
  constructor(maxTownCount, bigTownCount) {
    this.maxTownCount = maxTownCount;
    this.bigTownCount = bigTownCount;
    this.count = null;

    this.init();
  }

  init() {
    this.renderBigTown();
    this.renderSmallTown();
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  }

  renderBigTown() {
    const bigTownNum = this.getRandomInt(1, this.bigTownCount);
    this.count = bigTownNum;

    let html = '';
    for (let i = 1; i <= bigTownNum; i++) {
      html += this.renderTown(i, 'bigTowns');
    }

    Selectors.classSelector('town-container').innerHTML = html;
    Selectors.AllclassSelector('bigTowns').forEach((bigTown) => {
      bigTown.style.placeSelf = this.getLocation();
    });
  }

  renderSmallTown() {
    while (this.count <= this.maxTownCount) {
      let rand = this.getRandomInt(1, this.count);
      this.count++;
      Selectors.IDSelector(rand).innerHTML += this.renderTown(this.count);
    }
  }

  renderTown(id, className = '') {
    return `<div class="towns ${className}" id="${id}">${id}</div>`;
  }

  getLocation() {
    const LOCATION_ATTR = [
      'auto center',
      'normal start',
      'center normal',
      'start auto',
      'end normal',
      'self-start auto',
      'self-end normal',
      'flex-start auto',
      'flex-end normal',
      'left auto',
      'right normal',
      'baseline normal',
      'first baseline auto',
      'last baseline normal',
      'stretch auto',
    ];
    const LOCATION_ATTR_LEN = LOCATION_ATTR.length;
    return LOCATION_ATTR[this.getRandomInt(0, LOCATION_ATTR_LEN)];
  }
}

(function () {
  const townMaxCount = 10;
  const bigTownCount = 4;
  const town = new TownGenerator(townMaxCount, bigTownCount);
})();
