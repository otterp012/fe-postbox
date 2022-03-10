class Selectors {
  constructor() {}

  static IDSelector(str, start = document.body) {
    const queue = [start];
    const visited = {};
    visited[start] = true;
    while (queue.length) {
      for (let i = 0; i < queue.length; i++) {
        const parent = queue.shift();
        for (const child of parent.childNodes) {
          if (child.id == str) return child;
          else {
            visited[child] = true;
            queue.push(child);
          }
        }
      }
    }
    return null;
  }

  static AllclassSelector(str) {
    const start = document.body;
    const queue = [start];
    const visited = {};
    const result = [];
    visited[start] = true;

    while (queue.length) {
      for (let i = 0; i < queue.length; i++) {
        const parent = queue.shift();
        for (const child of parent.childNodes) {
          if (String(child.className).includes(str)) result.push(child);
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
        const parent = queue.shift();
        for (const child of parent.childNodes) {
          if (String(child.className).includes(str)) return child;
          else {
            visited[child] = true;
            queue.push(child);
          }
        }
      }
    }
    return null;
  }
}

class TownGenerator {
  constructor(maxTownCount, bigTownCount) {
    this.maxTownCount = maxTownCount;
    this.bigTownCount = bigTownCount;
    this.count = null;
    this.set = null;
    this.init();
  }

  init() {
    this.renderBigTown();
    this.renderSmallTown();
    this.renderPost(4);
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
    while (this.count < this.maxTownCount) {
      let rand = this.getRandomInt(1, this.count);
      this.count++;
      Selectors.IDSelector(rand).innerHTML += this.renderTown(this.count);
    }
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

  getPostCount(number) {
    const set = new Set();
    for (let i = 0; i < number; i++) {
      const randomId = this.getRandomInt(1, this.maxTownCount);
      const postSize = i;
      set.add([randomId, postSize]);
    }
    return set;
  }

  renderTown(id, className = '') {
    return `<div class="towns ${className}" id="${id}">${id}</div>`;
  }

  renderPost(number) {
    this.set = this.getPostCount(number);
    this.set.forEach((arr) => {
      Selectors.IDSelector(arr[0]).insertAdjacentText('afterbegin', '📮 ');
    });
    console.log(this.set);
  }
}

(function () {
  const townMaxCount = 10;
  const bigTownCount = 4;
  const town = new TownGenerator(townMaxCount, bigTownCount);
})();
