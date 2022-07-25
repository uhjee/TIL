import { SetMetadata } from '@nestjs/common';

export const TYPEORM_EX_CUSTOM_REPOSITORY = 'TYPEORM_EX_CUSTOM_REPOSITORY';

export function CustomRepository(entity: Function): ClassDecorator {
  // CustomRepository 데코레이터를 사용한 entity를 메타데이터에 세팅
  return SetMetadata(TYPEORM_EX_CUSTOM_REPOSITORY, entity);
}
