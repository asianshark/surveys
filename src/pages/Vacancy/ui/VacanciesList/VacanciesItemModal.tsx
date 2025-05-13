import {  Modal } from "antd"
const VacanciesItemModal = ({isModalOpen, onClose}: {isModalOpen: boolean, onClose: (e: boolean) => void}) => {
  const handleOk = () => {
    onClose(false);
  };

  const handleCancel = () => {
    onClose(false);
  };
  return (
    <Modal
      title="Basic Modal"
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p className="text-[#1A3353] font-[400]">Вы действительно хотите предложить собственную кандидатуру на должность “Начальник четвертого Департамента СГО”?</p>
    </Modal>
  )
}
export default VacanciesItemModal