export interface SkeletonProps {
  /**
   * The shape of the loader
   */
  variant?: 'rect-thin' | 'rect-big' | 'avatar' | 'text' | 'button' | 'circle';
  /**
   * To make it full width
   */
  fullWidth?: boolean;
  /**
   * To customize the loader
   */
  className?: string;
}
