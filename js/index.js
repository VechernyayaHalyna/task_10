// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
    
  fruitsList.innerHTML = "";

  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    let itemList = document.createElement('li');
    itemList.className = 'fruit__item';
    fruitsList.appendChild(itemList);
    let divInfo = document.createElement('div');
    divInfo.className = 'fruit__info';
    itemList.appendChild(divInfo);
    let indexDiv = document.createElement('div');
    let kindDiv = document.createElement('div');
    let colorDiv = document.createElement('div');
    let weightDiv = document.createElement('div');
    let indexText = document.createTextNode(`index: ${[i]}`);
    let kindText = document.createTextNode(`kind: ${fruits[i].kind}`);
    let colorText = document.createTextNode(`color: ${fruits[i].color}`);
    let weightText = document.createTextNode(`weight: ${fruits[i].weight}`);
    indexDiv.appendChild(indexText);
    kindDiv.appendChild(kindText);
    colorDiv.appendChild(colorText);
    weightDiv.appendChild(weightText);
    divInfo.appendChild(indexDiv);
    divInfo.appendChild(kindDiv);
    divInfo.appendChild(colorDiv);
    divInfo.appendChild(weightDiv);
    let fruitColor = fruits[i].color;
    switch (fruitColor) {
      case "фиолетовый":
        itemList.classList.add("fruit_violet");
        break;
      case "зеленый":
        itemList.classList.add("fruit_green");
        break;
      case "розово-красный":
        itemList.classList.add("fruit_carmazin");
        break;
      case "желтый":
        itemList.classList.add("fruit_yellow");
        break;
      case "светло-коричневый":
        itemList.classList.add("fruit_lightbrown");
        break;
    }
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/ 

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    let randomFruit = getRandomInt(0, fruits.length - 1);
    console.log(randomFruit);
    let newArrFruit = fruits[randomFruit];
    console.log(newArrFruit);
    fruits.splice(randomFruit, 1);
    console.log(fruits);
    result.push(newArrFruit);
    console.log(result);
    if (JSON.stringify(fruits) === JSON.stringify(result)) {
      alert('Порядок не изменился!')
    }
  }

  fruits = result;
  console.log(fruits);
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
   let filteredFruits = fruits.filter((item) => {
    // TODO: допишите функцию
    const minWeight = document.querySelector('.minweight__input').value;
    console.log(minWeight);
    const maxWeight = document.querySelector('.maxweight__input').value;
    console.log(maxWeight);
    console.log(item.weight);
    console.log(item.weight >= minWeight && item.weight <= maxWeight);
      return item.weight >= minWeight && item.weight <= maxWeight;
   });
  fruits = filteredFruits;
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  const priority = ['фиолетовый', 'зеленый', 'желтый', 'светло-коричневый', 'розово-красный'];
  const priority1 = priority.indexOf(a.color);
  const priority2 = priority.indexOf(b.color);
  return priority1 - priority2;
};

const sortAPI = {
  bubbleSort(fruits, comparation = comparationColor) {
    // TODO: допишите функцию сортировки пузырьком
    const n = fruits.length;
    for (let i = 0; i < n - 1; i++) {
      // внутренняя итерация для перестановки элемента в конец массива
      for (let j = 0; j < n - 1 - i; j++) {
        // сравниваем элементы
        if (comparation(fruits[j], fruits[j + 1]) === 1) {
          // делаем обмен элементов
          let temp = fruits[j + 1];
          fruits[j + 1] = fruits[j];
          fruits[j] = temp;
        }
      }
    }
  },

  quickSort(fruits, comparation) {
    // TODO: допишите функцию быстрой сортировки
    const pivot = fruits[fruits.length - 1];
    const leftList = [];
    const rightList = [];
    for (let i = 0; i < fruits.length - 1; i++) {
       if (fruits[i] < pivot) {
           leftList.push(fruits[i]);
       }
       else {
           rightList.push(fruits[i])
       }
    }
    return [...quickSort(leftList), pivot, ...quickSort(rightList)];
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  if (sortKind == 'bubbleSort') {
    sortKind = 'quickSort';
  } else {
    sortKind = 'bubbleSort';
  }
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  display();
});
