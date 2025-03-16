import { FC } from 'react';
import { TitleProps } from './title.types';

const Title: FC<TitleProps> = ({ text }) => {

  return (
    <h1 className='text-[35px] font-semibold text-[#3d9939] my-3 text-center uppercase' >{text}</h1> 
  );
};

export default Title;
