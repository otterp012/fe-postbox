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

  static allClassSelector(str, start = document.body) {
    const queue = [start];
    const result = [];
    const visited = {};
    visited[start] = true;

    while (queue.length) {
      for (let i = 0; i < queue.length; i++) {
        let parent = queue.shift();
        parent.childNodes.forEach((v, i) => {
          if (v.className === str) {
            result.push(v);
          }
          visited[(parent.childNodes[i] = true)];
          queue.push(parent.childNodes[i]);
        });
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
          if (child.className == str) return child;
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
      html += this.renderTown(i);
    }
    Selectors.classSelector('town-container').innerHTML = html;
  }

  renderSmallTown() {
    while (this.count <= this.maxTownCount) {
      let rand = this.getRandomInt(1, this.count);
      this.count++;
      Selectors.IDSelector(rand).innerHTML += this.renderTown(this.count);
    }
  }

  renderTown(id) {
    return `<div class="towns" id="${id}">${id}</div>`;
  }
}

(function () {
  const townMaxCount = 10;
  const bigTownCount = 4;
  const town = new TownGenerator(townMaxCount, bigTownCount);
})();
