import { Space, Table, TableColumnsType, TablePaginationConfig, TableProps } from "antd";
import axios from "axios";
import { t } from "i18next";
import { useEffect, useState } from "react";

type UserList = {
  userId: string;
  lastName: string;
  quizId: number;
  attemptNumber: number;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
};
type OnChange = NonNullable<TableProps<UserList>['onChange']>;

const UsersSurveyResultsList = ({ quizId, choosenResult }: { choosenResult: (userId: string, attemptNumber: number) => void, quizId: string | undefined }) => {
  const [usersList, setUsersList] = useState<UserList[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 7
  });
  useEffect(() => {
    axios.get('/responses/result/response_list', { params: { 'quizId': quizId } }).then((res) => {
      setUsersList(res.data);
    });
  }, [])
  const detailed = (userId: string, attemptNumber: number) => {
    choosenResult(userId, attemptNumber)
  }
  const colums: TableColumnsType<UserList> = [
    {
      title: t('firstName'),
      dataIndex: 'firstName',
      key: 'firstName',
      ellipsis: true,
    },
    {
      title: t('percentage'),
      dataIndex: 'percentage',
      key: 'percentage',
      render: (_, record) =>
        <Space>
          <p>{record.percentage}%</p>
        </Space>,
      ellipsis: true,
    },
    {
      title: t('scored-points'),
      key: 'correctAnswers',
      render: (_, record) =>
        <Space>
          <p>{record.correctAnswers}/{record.totalQuestions}</p>
        </Space>
    },
    {
      title: t('more-detailed'),
      render: (_, record) =>
        <Space>
          <p onClick={() => detailed(record.userId, record.attemptNumber)} className="text-blue-500 cursor-pointer">{t('more-detailed')}</p>
        </Space>
    }
  ]
  const handleChange: OnChange = (pagination) => {
    setPagination(pagination)
  };
  return (
    <div className="p-5 rounded-[10px] bg-white h-full">
      <Table
        columns={colums}
        rowClassName="editable-row"
        dataSource={usersList}
        pagination={pagination}
        rowKey={(record) => `${record.userId}-${record.attemptNumber}`}
        onChange={handleChange}
      />
    </div>
  );
}
export default UsersSurveyResultsList;