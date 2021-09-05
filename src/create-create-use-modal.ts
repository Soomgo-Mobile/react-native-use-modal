import { createUseModal } from './create-use-modal';
import type { CreateModalOption } from './create-modal';
import _ from 'lodash';

/**
 * createUseModal creation function with default value of option argument set
 */
export const createCreateUseModal =
  (_option: CreateModalOption): typeof createUseModal =>
  (...param) => {
    const [Content, option] = param;
    const composedOption = _.defaultsDeep(option, _option);
    return createUseModal(Content, composedOption);
  };
