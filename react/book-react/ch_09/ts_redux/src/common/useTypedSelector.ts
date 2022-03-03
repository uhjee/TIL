import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { ReduxState } from './store';

/**
 * redux useSelector의 타입이 미리 입력된 훅 생성
 *
 * @var {[type]}
 */
const useTypedSelector: TypedUseSelectorHook<ReduxState> = useSelector;
export default useTypedSelector;
