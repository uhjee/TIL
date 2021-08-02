class ArrayList {
  array = [];

  insert(item) {
    this.array.push(item);
  }

  toString() {
    return this.array.join(', ');
  }

  // index1 과 index2의 순서 변경
  #swap(index1, index2) {
    let temp = this.array[index1];
    this.array[index1] = this.array[index2];
    this.array[index2] = temp;
  }

  // ! 버블 정렬 - 단순한 만큼 최악의 시간소요
  // O(n^ 2)
  bubbleSort() {
    const length = this.array.length;

    // 모든 요소 순회
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - 1; j++) {
        // 모든 원소들 순회하며 비교
        if (this.array[j] > this.array[j + 1]) {
          this.#swap(j, j + 1);
        }
      }
    }
  }

  // ! 향상된 버블 정렬
  // O(n^2)
  bubbleSortModified() {
    const length = this.array.length;
    // 모든 요소 순회
    for (let i = 0; i < length; i++) {
      // -i 를 수행해 바깥쪽 루프의 반복 횟수 차감
      for (let j = 0; j < length - 1 - i; j++) {
        // 모든 원소들 순회하며 비교
        if (this.array[j] > this.array[j + 1]) {
          this.#swap(j, j + 1);
        }
      }
    }
  }

  // ! 선택정렬
  // O(n^2)
  selectionSort() {
    const length = this.array.length;
    let indexMin = null;

    for (let i = 0; i < length - 1; i++) {
      // 순회 기준 값
      indexMin = i;

      // 순회돌면서 기준 값보다 작다면, 기준값의 자리로 swap
      // 가장 작은 최소값을 찾는 루프문
      for (let j = i; j < length; j++) {
        if (this.array[indexMin] > this.array[j]) {
          indexMin = j;
        }
      }
      if (i !== indexMin) {
        this.#swap(i, indexMin);
      }
    }
  }

  // ! 삽입 정렬
  insertionSort() {
    const length = this.array.length;
    let t = null;
    let temp = null;

    for (let i = 0; i < length; i++) {
      j = i; // 기준
      temp = this.array[i];

      // 자신보다 앞 쪽의 값들과 비교해, 자신이 앞보다 작다면, 해당 자리와 바꾼다.
      while (j > 0 && this.array[j - 1] > temp) {
        this.array[j] = this.array[j - 1];
        j--;
      }
      this.array[j] = temp;
    }
  }

  // ! 병합 정렬

  #merge(left, right) {
    const result = [];
    let il = 0;
    let ir = 0;

    while (il < left.length && ir < right.length) {
      if (left[il] < right[ir]) {
        result.push(left[il++]);
      } else {
        result.push(right[ir++]);
      }
    }
    while (il < left.length) {
      result.push(left[il++]);
    }
    while (ir < right.length) {
      result.push(right[ir++]);
    }
    return result;
  }

  #mergeSortRec(array) {
    const length = this.array.length;

    if (length === 1) {
      // 재귀의 중단 조건
      return array;
    }

    let mid = Math.floor(length / 2); // 중간값
    let left = array.slice(0, mid);
    let right = array.slice(mid, length);

    return this.#merge(this.#mergeSortRec(left), this.#mergeSortRec(right));
  }

  mergeSort() {
    // 재귀 호출
    this.array = this.#mergeSortRec(this.array);
  }

  // ! 퀵 소트
  #swapQuickSort(array, index1, index2) {
    let aux = array[index1];
    array[index1] = array[index2];
    array[index2] = aux;
  }

  #partition(array, left, right) {
    let pivot = array[Math.floor((right, +left) / 2)];
    let i = left;
    let j = right;

    while (i <= j) {
      while (array[i] < pivot) {
        i++;
      }
      while (array[j] > pivot) {
        j--;
      }
      if (i <= j) {
        this.#swapQuickSort(array, i, j);
        i++;
        j--;
      }
    }
    return i;
  }

  #quick(array, left, right) {
    let index;

    if (array.length > 1) {
      index = this.#partition(array, left, right);

      if (left < index - 1) {
        this.#quick(array, left, index - 1);
      }

      if (index < right) {
        this.#quick(array, index, right);
      }
    }
  }

  quickSort() {
    this.#quick(this.array, 0, this.array.length - 1);
  }
}

module.exports = { ArrayList };
