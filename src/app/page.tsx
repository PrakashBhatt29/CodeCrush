import { Card } from "@/components/Card";
import Pagination from "@/components/Pagination";
import QuestionCard from "@/components/QuestionCard";
import { Quote } from "@/components/Quote";
import { answerCollection, db, questionCollection, voteCollection } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import { Query } from "node-appwrite";



export default async function NeonGradientCardDemo({
  searchParams,
}: {
  searchParams: { page?: string; tag?: string; search?: string };
}) {
  searchParams.page ||= "1";

  const queries = [
      Query.orderDesc("$createdAt"),
      Query.offset((+searchParams.page - 1) * 25),
      Query.limit(25),
  ];

  if (searchParams.tag) queries.push(Query.equal("tags", searchParams.tag));
  if (searchParams.search)
      queries.push(
          Query.or([
              Query.search("title", searchParams.search),
              Query.search("content", searchParams.search),
          ])
      );

  const questions = await databases.listDocuments(db, questionCollection, queries);
  console.log("Questions", questions)

  questions.documents = await Promise.all(
      questions.documents.map(async ques => {
          const [author, answers, votes] = await Promise.all([
              users.get<UserPrefs>(ques.authorId),
              databases.listDocuments(db, answerCollection, [
                  Query.equal("questionId", ques.$id),
                  Query.limit(1), // for optimization
              ]),
              databases.listDocuments(db, voteCollection, [
                  Query.equal("type", "question"),
                  Query.equal("typeId", ques.$id),
                  Query.limit(1), // for optimization
              ]),
          ]);

          return {
              ...ques,
              totalAnswers: answers.total,
              totalVotes: votes.total,
              author: {
                  $id: author.$id,
                  reputation: author.prefs.reputation,
                  name: author.name,
              },
          };
      })
  );


  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <Card />
        </div>
        <div className="hidden lg:block">
          <Quote/>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-full mb-4 max-w-3xl space-y-6">
            {questions.documents.map(ques => (
              <QuestionCard key={ques.$id} ques={ques} />
            ))}
            <Pagination total={questions.total} limit={5} />
          </div>
        </div>
    </div>
  );
};