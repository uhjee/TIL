import { Request, Response } from 'express';
import {
  getAllDataService,
  getDataService,
  addDataService,
} from '../services/dataService';
import { ResponseDto } from '../types/dtos';

export const addData = async (req: Request, res: Response) => {
  const result: ResponseDto = {
    success: false,
  };
  const arrayName = req.params['0'];
  if (!arrayName) {
    result.message = 'Array 이름을 URL path에 명시해주세요.';
    res.json(result);
    return;
  }

  try {
    await addDataService(arrayName, req.body);
    result.success = true;
  } catch (e) {
    console.log(e);
  }
  res.json(result);
};

export const getAllData = async (req: Request, res: Response) => {
  const result: ResponseDto = {
    success: false,
  };
  try {
    result.success = true;
    result.data = await getAllDataService();
  } catch (e) {
    console.log(e);
  }
  res.json(result);
};

export const getData = async (req: Request, res: Response) => {
  const result: ResponseDto = {
    success: false,
  };

  const arrayName = req.params['0'];
  if (!arrayName) {
    result.message = 'Array 이름을 URL path에 명시해주세요.';
    res.json(result);
    return;
  }
  try {
    result.success = true;
    result.data = await getDataService(arrayName);
  } catch (e) {
    console.log(e);
  }
  res.json(result);
};
