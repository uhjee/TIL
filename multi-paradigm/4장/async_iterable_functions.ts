/**
 * 비동기 작업을 지연시키는 함수
 * @param time 지연 시간
 * @param value 반환할 값
 * @returns 지연된 값을 반환하는 Promise
 */
function delay<T>(time: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(resolve, time, value));
}

export { delay };
