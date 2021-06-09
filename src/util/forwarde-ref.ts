import type { ComponentPropsWithRef } from 'react';

export type ForwardedRef<
  Component extends React.ForwardRefExoticComponent<any>
> = NonNullable<
  Exclude<
    NonNullable<ComponentPropsWithRef<Component>['ref']>,
    Function
  >['current']
>;
