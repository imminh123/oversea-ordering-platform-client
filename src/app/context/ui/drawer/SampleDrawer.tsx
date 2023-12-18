import DrawerWrapper from './DrawerWrapper';
import { EDrawerType } from '../enum';

const SampleDrawer: React.FC = () => {
  return <DrawerWrapper drawerType={EDrawerType.SAMPLE_DRAWER}>sample drawer</DrawerWrapper>;
};

export default SampleDrawer;
