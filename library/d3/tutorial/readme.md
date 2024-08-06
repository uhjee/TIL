# d3

## 1. Data Generator

- 생성기는 데이터를 입력 받고, 해당 객체를 그릴 수 있는 SVG attribute `d`의 value 코드를 반환
  ```js
    const f = d3.arc()
    .innerRadius(0)
    .outerRadius(50)
    
    g.selectAll('path')
    .data(pie(data)) // 레이아웃
    .enter()
    .append('path')
    .attr('fill', 'pink')
    .attr('stroke', 'blue')
    .attr('stroke-width', '2px')
    .attr('d', f); // attribute 'd' 의 값으로 Data gen 세팅
  ```

- line()
- area()
  - 반환 예시
    ```svg
        M0,115C3.333,119.615,6.667,124.231,10,135C13.333,145.769,16.667,162.693,20,170C23.333,177.307,26.667,174.997,30,185C33.333,195.003,36.667,217.321,40,225C43.333,232.679,46.667,225.721,50,235C53.333,244.279,56.667,269.794,60,280C63.333,290.206,66.667,285.103,70,280L70,50C66.667,65.103,63.333,80.206,60,80C56.667,79.794,53.333,64.279,50,65C46.667,65.721,43.333,82.679,40,85C36.667,87.321,33.333,75.003,30,75C26.667,74.997,23.333,87.307,20,90C16.667,92.693,13.333,85.769,10,85C6.667,84.231,3.333,89.615,0,95Z
    ```
- arc()
  - 반환 예시
    ```svg
      M-50,0A50,50,0,0,1,-29.389,-40.451L0,0Z
    ```

## 2. Component
- 화면에 표현될 수 있는 객체 생성
  - 생성기는 svg 안에 d값을 생성하는 것이고, 컴포넌트는 화면에 직접 포함되는 값을 생성
- brush()
- zoom()
- text()
- axis() - [https://github.com/d3/d3-axis](https://github.com/d3/d3-axis)

## 3. Layout
- 데이터를 입력 받아 그래프를 그릴 수 있는 데이터를 생성한 후 반환
  - Raw Data => Layout => 가공 데이터
    ```js
    const f = d3.arc()
    .innerRadius(0)
    .outerRadius(50)
    
    g.selectAll('path')
    .data(pie(data)) // 레이아웃
    .enter()
    .append('path')
    .attr('fill', 'pink')
    .attr('stroke', 'blue')
    .attr('stroke-width', '2px')
    .attr('d', f); // d의 값으로 세팅
  ```
- pie()
- histogram(), bin() - 히스토그램 데이터
- pack() - circle pack 형태 데이터: 계층 구조의 챠트
  - 계층구조 데이터 가공: hierarchy(), stratify() -> 이렇게 만들어진 node 단위들의 메소드, each(), ancestors(), descendants() 등
- tree() - tree 형태 데이터
- stack() - 누적형 데이터
- cloud() - 워드 클라우드 형태 데이터
