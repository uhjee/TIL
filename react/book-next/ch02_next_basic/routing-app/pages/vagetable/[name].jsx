import Link from 'next/link';
import { useRouter } from 'next/router';

import Back from '../Back';

const Name = () => {
  const router = useRouter();
  return (
    <div>
      <h2>Hello!! {router.query.name}</h2>
      <Link href="/">Move to '/'</Link>
      <Back />
    </div>
  );
};

export default Name;
