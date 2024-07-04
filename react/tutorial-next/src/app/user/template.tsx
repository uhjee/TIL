/**
 * template
 * - layout 과 다르게 하위 라우트가 변경될 때마다 새로운 instance 반환
 * - 구조상 layout 과 children 사이에 있음
 */


export default function Template({ children }: { children: React.ReactNode }) {
  console.log('template rendering...');

  return (
    <div>
      이건 템플릿
      {children}
    </div>
  );
}
