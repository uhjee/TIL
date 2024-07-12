import { Config, JsonDB } from 'node-json-db';

const db = new JsonDB(new Config('jsonDb', true, false, '/'));

export const addDataService = async (arrayName: string, obj: Object) => {
  await db.push(`/arrayTest/${arrayName}[]`, obj, true);
};

export const getAllDataService = async () => {
  return await db.getObjectDefault<string>('/arrayTest', 'no data');
};

export const getDataService = async (arrayName: string) => {
  return await db.getObjectDefault<string>(
    `/arrayTest/${arrayName}`,
    'no data',
  );
};
