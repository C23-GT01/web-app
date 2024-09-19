import logo from '../../assets/img/tr-logo.png'
import Icon from './Icon';

const Brand = () => {
  return (
    <div className='flex items-center gap-2'>
      <Icon>
        <img src={logo} alt="" />
      </Icon>
      <h1 className='text-h1 text-[#dc0000] font-bold font-inter hidden sm:inline'>SIDUKAS</h1>
    </div>
  );
};

export default Brand;