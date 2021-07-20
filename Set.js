class MySet {
  length = 0;
  #items = [];
  #size = 0;

  constructor(iterable) {
    const iterator = iterable[Symbol.iterator];
    if (!iterator) {
      throw new TypeError(
        `${typeof iterable}${
          typeof iterable !== "object" ? ` ${iterable}` : ""
        } is not iterable (cannot read property Symbol(Symbol.iterator))`
      );
    }

    for (const value of iterable) {
      this.add(value);
    }
  }

  get size() {
    return this.#size;
  }

  get [Symbol.toStringTag]() {
    return "MySet";
  }

  keys = this.values;

  [Symbol.iterator] = this.values;

  values() {
    return this.#items[Symbol.iterator]();
  }

  add(value) {
    if (!this.has(value)) {
      this.#items.push(value);
      this.#size++;
    }
  }

  clear() {
    this.#size = 0;
    this.#items = [];
  }

  delete(value) {
    this.#items = this.#items.filter((val) => val !== value);
    this.#size = this.#items.length;
  }

  has(value) {
    return this.#items.includes(value);
  }

  forEach(cb, ctx) {
    const fn = ctx ? cb.bind(ctx) : cb;

    for (const val of this.values()) {
      fn(val);
    }
  }

  entries = function* entries() {
    for (const val of this.values()) {
      yield [val, val];
    }
  };
}

// тесты
const set = new MySet([4, 8, 15, 15, 16, 23, 42]);

// хранит только уникальные значения
console.log([...set]); // [ 4, 8, 15, 16, 23, 42 ]

// есть свойство size
console.log(set.size); // 6

// работает в цикле for-of
for (const item of set) {
  console.log(item); // 4 8 15 16 23 42
}

// есть методы keys, values, entries
for (const item of set.entries()) {
  console.log(item); // [ 4, 4 ] [ 8, 8 ] ...
}

// есть метод clear
set.clear();
console.log(set.size); // 0

const object = {
  getValue() {
    return this.value;
  },
};

const data = {
  value: 42,
};

// есть метод add
set.add(object);
set.add(data);

// есть метод delete
set.delete(data);

// есть метод has
console.log(set.has({})); // false
console.log(set.has(object)); // true
console.log(set.has(data)); // false

// и кое-что еще
console.log(set === set.valueOf()); // true
console.log(String(set)); // [object MySet]
console.log(Object.prototype.toString.call(set)); // [object MySet]

// задание со звездочкой *
// есть forEach, который делает какие-то странные вещи...
set.forEach(function (item) {
  console.log(item.getValue.call(this)); // 42
}, data);
