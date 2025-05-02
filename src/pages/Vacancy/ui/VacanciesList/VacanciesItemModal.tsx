import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd"
const { confirm } = Modal;
const VacanciesItemModal = () => {
    confirm({
        icon: <ExclamationCircleOutlined />,
        content: <Button>Click to destroy all</Button>,
        onOk() {
          console.log('OK');
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    return (
        <Modal/>
    )
}
export default VacanciesItemModal