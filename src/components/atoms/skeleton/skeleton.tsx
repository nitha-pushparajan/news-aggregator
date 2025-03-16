import clsx from 'clsx';
import { FC } from 'react';
import { SkeletonProps } from './skeleton.types';

/**
 * Skeleton Loader component with different variants
 */
const Skeleton: FC<SkeletonProps> = ({ className, fullWidth, variant }) => {
  const classNames = {
    loader: clsx('animate-pulse rounded bg-gray-300', className, {
      'h-[50px] w-[120px]': variant === 'button',
      'h-2': variant === 'text',
      'h-[250px]': variant === 'rect-big',
      'h-10': variant === 'rect-thin',
      'h-10 w-10 rounded-full': variant === 'avatar',
      'h-[100px] w-[100px] rounded-full': variant === 'circle',
      '!w-full': fullWidth
    })
  };

  return <div role="presentation" className={classNames.loader} />;
};

export default Skeleton;
