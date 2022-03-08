const words = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

// 26

// 26개 중 -> 4개를 만들고
// 누적합으로 ++
// console.log(Math.floor(Math.random() * 10));
// console.log(Math.floor(Math.random() * 10));
// console.log(Math.floor(Math.random() * 10));

// A = 5
// console.log(Math.floor(Math.random() * 5));
// console.log(Math.floor(Math.random() * 5));
// console.log(Math.floor(Math.random() * 5));
// console.log(Math.floor(Math.random() * 5));
// A의 1층은 -- 1개
// A의 2층에는 --- 3개 <<<  <div class="town-container" id="A"></div>.repeat(3)
// A의 3층은 5-(1+3) = 1 // 0외  -- 1개
// 층의 개수는 정해진거에요.

//        B
//     C  D  E
//        F    // Math. 1-3
//

// B = 1
// C = 7
// D = 26 - (A+B+C)

let count = 26;
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

// 맨 첫 마을개수 --

const bigtown = getRandomInt(1, 4);
console.log(bigtown); // 3개
count = count - 3;
let bigtownArr = ['A', 'B', 'C']; // 3개
let bigtownChild = [10, 7, 5]; // << A의 자식들 총합은 10

let Achild = 4;
// 10 - 4 = 6;
//     A
//   B  C            D E
// FGH IJK          0  0
//
// A의 자식들이 가지고 있는 town의 개수
const arr = [0, 0, 0];
console.log(getRandomInt(1, 6));
console.log(getRandomInt(1, 6));
console.log(getRandomInt(1, 6));
console.log(getRandomInt(1, 6));

function div(str, child = '') {
  return `
    <div class="towns" id="${str}">${str}${child}
        </div>`;
}

const B = div('B', div('F') + div('G') + div('H'));
console.log(div('A', B));

class Town {
  constructor() {
    this.words = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
    this.count = this.words.length;
    this.infor = ['A', 'B', 'C'];
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  }

  renderTown(townName, child = '') {
    return `
    <div class="towns" id="${townName}">${townName}${child}
        </div>`;
  }

  init() {
    let arr = [];
    for (let i = 0; i < this.infor.length; i++) {
      let rand = this.getRandomInt(1, 8);
      if (this.count - rand > 0) {
        arr.push(rand);
      } else if (this.count < 0) {
        arr.push(0);
      } else {
        arr.push(rand - this.count);
        this.count = 0;
      }
      this.count -= rand;
      console.log(rand);
      console.log(this.count);
    }
    return arr;
  }
}

const temp = new Town();
console.log(temp.init());
