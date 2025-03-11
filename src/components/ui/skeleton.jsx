import cn from '@/lib/utils';
import PropTypes from 'prop-types';

function Skeleton({ className, ...props }) {
  return <div data-slot="skeleton" className={cn('bg-[#1e1e1e]/50 animate-pulse rounded-md', className)} {...props} />;
}

export default Skeleton;

Skeleton.propTypes = {
  className: PropTypes.string,
};
