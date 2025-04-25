import axios from "axios";
import { useEffect, useState } from "react";
import { Answer, Question } from "../../entities/Survey";
import { useLocation, useOutletContext } from "react-router";

interface UserSurveyResultProps {
  quizId?: string | undefined;
  questions?: Question[] | undefined;
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

const UserSurveyResult: React.FC<UserSurveyResultProps> = () => {
  const location = useLocation();
  const { questions, quizId } = useOutletContext<{ quizId: string | undefined, questions: Question[] | undefined }>();
  const { userId, attemptNumber } = location.state || {};
  const [results, setResults] = useState<Result | null>(null);

  useEffect(() => {
    if (quizId) {
      axios.get('/responses/result/attempt', {
        params: { userId: userId, quizId, attempt: attemptNumber },
      }).then((res) => {
        setResults(res.data);
      });
    }
  }, [quizId]);

  const getCorrectAnswersText = (answers: Answer[] | undefined, correctAnswerIds: number[]) => {
    if (answers)
      return answers
        .filter(ans => ans.id ? correctAnswerIds.includes(ans.id) : false)
        .map(ans => ans.nameRu)
        .join(', ');
    return ''
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-5 pt-0 flex justify-between">
        Процент правильных ответов: {results?.percentage}%
      </div>
      <div className="flex h-full flex-col items-center gap-6">
        {questions?.map((item) => {
          const questionResult = results?.questionResults.find((e) => e.questionId === item.id);

          return (
            <div style={{ fontFamily: 'Roboto' }}
              key={item.id}
              className="bg-white rounded-[10px] border-1 p-5 flex flex-col gap-4 w-3/4 border-[#E6EBF1]"
            >
              <div className="flex gap-2">
                <div className="flex gap-2 w-full text-[16px] text-[#455560] items-center">{item.nameRu}</div>
              </div>

              {item.answers?.map((ans) => {
                const isSelected = ans.id ? questionResult?.selectedAnswers.includes(ans.id) : false;

                return (
                  <div key={ans.id} className="space-y-4">
                    <label className="flex items-center cursor-pointer">
                      {item.multipleAns ?
                        <div
                          className={`w-4 h-4 rounded border ${isSelected ? "border-[#3b82f6] bg-white" : "border-gray-300 bg-white"
                            } flex items-center justify-center mr-3`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-[1.5px] bg-[#3b82f6]" />}
                        </div> :
                        <div
                          className={`w-4 h-4 rounded-full border ${isSelected ? "border-[#3b82f6] bg-white" : "border-gray-300 bg-white"
                            } flex items-center justify-center mr-3`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-[#3b82f6]" />}
                        </div>}
                      <span className="text-[#2d3e50]">{ans.nameRu}</span>
                    </label>
                  </div>
                );
              })}
              <div className="text-sm text-[#455560]">
                Правильный ответ: {getCorrectAnswersText(item.answers, questionResult?.correctAnswers || [])}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserSurveyResult;
