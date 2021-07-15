import { createUseModal } from './create-use-modal';
import type {
  CreateModalFunctionParam,
  CreateModalOption,
} from './create-modal';
import _ from 'lodash';

/**
 * createUseModal creation function with default value of option argument set
 */
export const preConfigCreateUseModal = (_option: CreateModalOption) => {
  const composed = <Data extends unknown = void, Param extends unknown = void>(
    ...param: CreateModalFunctionParam<Data, Param>
  ) => {
    const [Content, option] = param;
    const composedOption = _.defaultsDeep(option, _option);
    return createUseModal<Data, Param>(Content, composedOption);
  };

  return composed;
};
