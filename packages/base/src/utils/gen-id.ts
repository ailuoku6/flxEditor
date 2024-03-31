import { v4 as uuidv4 } from 'uuid';

export const genUUID = (nameSpace: string) => {
    return `${nameSpace}@${uuidv4()}`;
}