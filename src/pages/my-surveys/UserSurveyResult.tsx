import { Radio, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Question } from "../../entities/Survey";

const style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
};

interface UserSurveyResultProps {
  quizId: string | undefined;
  questions: Question[] | undefined;
}

interface Result {
  percentage: number;
  questionResults: {
    questionId: number;
    selectedAnswers: number[];
    correctAnswers: number[];
    correct: boolean;
  }[];
}

const UserSurveyResult: React.FC<UserSurveyResultProps> = ({ quizId, questions }) => {
  const users = [
    { label: 'Есимгали', value: '1' },
    { label: 'Асет', value: '2' },
  ];

  const [user, setUser] = useState(users[0].value);
  const [results, setResults] = useState<Result | null>(null);

  useEffect(() => {
    if (quizId) {
      axios.get('/responses/result/detailed', {
        params: { userId: user, quizId },
      }).then((res) => {
        setResults(res.data);
      });
    }
  }, [user, quizId]);

  const getCorrectAnswersText = (questionId: number, answers: any[], correctAnswerIds: number[]) => {
    return answers
      .filter(ans => correctAnswerIds.includes(ans.id)) 
      .map(ans => ans.nameRu)
      .join(', '); 
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-5 flex justify-between">
        <Select
          value={user}
          onChange={setUser}
          options={users}
        />
        <div>
          Процент правильных ответов: {results?.percentage}%
        </div>
      </div>
      <div className="flex h-full flex-col items-center gap-6">
        {questions?.map((item) => {
          const questionResult = results?.questionResults.find((e) => e.questionId === item.id);

          return (
            <div style={{fontFamily: 'Roboto'}}
              key={item.id}
              className="bg-white rounded-[10px] border-1 p-5 flex flex-col gap-4 w-3/4 border-[#E6EBF1]"
            >
              <div className="flex gap-2">
                <div className="flex gap-2 w-full text-[16px] text-[#455560] items-center">{item.nameRu}</div>
              </div>

              {item.answers.map((ans) => {
                const isCorrect = questionResult?.correctAnswers.includes(ans.id);
                const isSelected = questionResult?.selectedAnswers.includes(ans.id);

                return (
                  <div key={ans.id} className="space-y-4">
                    <label className="flex items-center cursor-pointer">
                      <div
                        className={`w-4 h-4 rounded-full border ${isSelected ? "border-[#3b82f6] bg-white" : "border-gray-300 bg-white"
                          } flex items-center justify-center mr-3`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-[#3b82f6]" />}
                      </div>
                      <span className="text-[#2d3e50]">{ans.nameRu}</span>
                    </label>
                  </div>
                );
              })}
              <div className="text-sm text-[#455560]">
                Правильный ответ: {getCorrectAnswersText(item.id, item.answers, questionResult?.correctAnswers || [])}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserSurveyResult;
