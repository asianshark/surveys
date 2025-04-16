import { Space, Table, TableColumnsType } from "antd";
import axios from "axios";
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

const UsersSurveyResultsList = ({ quizId, choosenResult }: {choosenResult: (userId: string, attemptNumber: number)=> void, quizId: string | undefined }) => {
  const [usersList, setUsersList] = useState<UserList[]>([]);
  useEffect(() => {
    axios.get('/responses/result/response_list', { params: { 'quizId': quizId } }).then((res) => {
      console.log(res.data);
      setUsersList(res.data);
    });
  }, [])
  const detailed = (userId: string, attemptNumber: number) => {
    choosenResult(userId, attemptNumber)
  }
  const colums: TableColumnsType<UserList> = [
    {
      title: 'lastName',
      dataIndex: 'lastName',
      key: 'lastName',
      ellipsis: true,
    },
    {
      title: 'percentage',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (_, record) =>
        <Space>
          <p>{record.percentage}%</p>
        </Space>,
      ellipsis: true,
    },
    {
      title: 'Corrext Answers',
      key: 'correctAnswers',
      render: (_, record) =>
        <Space>
          <p>{record.correctAnswers}/{record.totalQuestions}</p>
        </Space>
    },
    {
      title: 'More',
      render: (_, record) =>
        <Space>
          <p onClick={() => detailed(record.userId, record.attemptNumber)} className="text-blue-500 cursor-pointer">More</p>
        </Space>
    }
  ]
  return (
    <div>
      <Table
        columns={colums}
        rowClassName="editable-row"
        dataSource={usersList}
        rowKey={(record) => `${record.userId}-${record.attemptNumber}`}
      />
    </div>
  );
}
export default UsersSurveyResultsList;