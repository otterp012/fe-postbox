function IDSelector(str, start = document.body) {
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

function allClassSelector(str, start = document.body) {
  //   const start = document.body;
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

function classSelector(str) {
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

console.log(classSelector('town-container'));

// 처음에 빅타운을 4개이하로 랜덤으로 만들어주는거
// ---- 현시점에 town 4개

//   A   B
// 1-2까지 굴려서 나온 값에 자식 마을을  한개 붙이기
//    A      B
//   C
// 총 마을의 개수는 3개 잖아요
//  1- 3까지굴려서 나온 값에 자식 마을을 한개 붙이기
// B
//    A    B
//   C      D
// 총 마을의 개수는 4개, 1-4까지
// 자식 마을을 한개 붙이기
//    A    B
//   C    D E
// 총 마을의 개수는 5개 id 12345 // 1-5까지
// 자식마을 한개 붙이기
//    A     B
//   C    D    E
//              F
// 6개 1-6까지 굴려요
//
//  [ 5 ]
//  [5 , 7]

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max + 1 - min)) + min; //최댓값은 제외, 최솟값은 포함
}

function renderTown(id) {
  return `<div class="towns" id="${id}">${id}</div>`;
}

function renderInitialTown() {
  const initailTownNum = getRandomInt(4, 4);
  let html = '';
  for (let i = 1; i <= initailTownNum; i++) {
    html += renderTown(i);
  }
  return html;
}

classSelector('town-container').innerHTML = renderInitialTown();

let count = 4;

while (count <= 10) {
  let rand = getRandomInt(1, count);
  count++;
  IDSelector(rand).innerHTML += renderTown(count);
}
// getRandomInt(1,4);
// IDSelector(1).innerHTML += renderTown(5);

// // 총 마을의 개수 5개

// getRandomInt(1,5);

// // 3이 나왔다

// IDSelector(3).innerHTML += renderTown(6);
