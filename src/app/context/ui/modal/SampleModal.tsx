import { EModalType } from '../enum';
import ModalWrapper from './ModalWrapper';

const SampleModal: React.FC = () => {
  return (
    <ModalWrapper modalType={EModalType.SAMPLE_MODAL} closeable={true} title='Sample Modal'>
      sample modal
    </ModalWrapper>
  );
};

export default SampleModal;
