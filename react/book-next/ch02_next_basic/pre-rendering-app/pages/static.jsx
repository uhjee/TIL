const staticPage = ({ time }) => {
  return (
    <div>
      <h2>getStaticProps</h2>
      {time}
    </div>
  );
};

// 빌드 시에 호출 후 정적으로 데이터 제공
export const getStaticProps = async () => {
  return { props: { time: new Date().toISOString() }, revalidate: 3 }; // revalidate: 데이터 재요청 interval
};

export default staticPage;
