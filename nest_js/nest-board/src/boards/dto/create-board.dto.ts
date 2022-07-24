import { IsNotEmpty } from 'class-validator';

export default class CreateBoardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
