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
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
}
export default VacanciesItemModal