"use client";

import { gql } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation, useQuery } from "@apollo/client/react";
import { TodoType } from "@/lib/types";

interface GetTodosResponse {
  getTodos: TodoType[];
}
const CREATE_TODOS = gql`
  mutation CreateTodos($id: ID!, $title: String!, $isDone: Boolean!) {
    createTodos(id: $id, title: $title, isDone: $isDone) {
      id
      title
      isDone
    }
  }
`;

const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      id
      title
      isDone
    }
  }
`;
const SamplePage = () => {
  const [inputValue, setInputValue] = useState("");
  const [createTodos, { loading: mutationLoading }] = useMutation(
    CREATE_TODOS,
    {
      refetchQueries: [{ query: GET_TODOS }],
    },
  );
  const { loading, error, data } = useQuery<GetTodosResponse>(GET_TODOS);

  const handleAddTodo = async () => {
    if (!inputValue) return alert("Please enter a task!");

    const newTodo = {
      id: uuidv4(),
      title: inputValue,
      isDone: false,
    };

    try {
      await createTodos({
        variables: {
          id: newTodo.id,
          title: newTodo.title,
          isDone: newTodo.isDone,
        },
      });
      setInputValue("");
    } catch (e) {
      console.error("Mutation error:", e);
    }
  };
  ``;
  console.log({ loading, error, data });

  if (error) return `Submission error! ${error.message}`;

  return (
    <div className="w-full h-screen flex flex-col items-center mt-20">
      Hello World ToDo
      <Card>
        <CardContent>
          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button onClick={handleAddTodo} disabled={mutationLoading}>
                Add
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              {loading ? (
                <div>Loading todos...</div>
              ) : (
                data?.getTodos?.map((todo: TodoType) => (
                  <div
                    key={todo.id}
                    className="flex justify-between items-center"
                  >
                    <div>{todo.title}</div>
                    <Button variant={"destructive"}>X</Button>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default SamplePage;
