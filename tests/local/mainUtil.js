import formurlencoded from 'form-urlencoded';
import {
  mainUtilNamedExportOne,
  mainUtilNamedExportTwo
} from './mainUtilNamedExports.js';

const mainUtil = () => 'mainUtil';

const createString = () => formurlencoded.default({
  mainUtil : 'a string',
  mainUtilNamedExportOneValue : mainUtilNamedExportOne(),
  mainUtilNamedExportTwoValue : mainUtilNamedExportTwo()
});

const causeRuntimeError = () => mainUtil()();

export default mainUtil;

export {
  mainUtil,
  createString,
  causeRuntimeError
};
