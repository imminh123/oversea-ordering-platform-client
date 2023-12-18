import ConfirmModal from './ConfirmModal';
import SampleModal from './SampleModal';

const ModalManager: React.FC = () => {
  return (
    <span>
      <SampleModal />
      <ConfirmModal />
    </span>
  );
};

export default ModalManager;
