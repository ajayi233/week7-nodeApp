const { ddbDocClient } = require("../config/config");
const { PutCommand, GetCommand, ScanCommand, UpdateCommand, DeleteCommand } = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require("uuid");

const TABLE_NAME = process.env.TABLE_NAME;
class Todo {
  //create todo
  async createTodo(todoData) {
    const todo = {
      id: uuidv4(),
      title: todoData.title,
      description: todoData.description || "",
      priority: todoData.priority || "medium",
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };

    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: todo,
    });

    await ddbDocClient.send(command);
    return todo;
  }

  //get all todos
  async getAllTodos() {
    const command = new ScanCommand({ TableName: TABLE_NAME });
    const result = await ddbDocClient.send(command);
    return result.Items;
  }

  //get single todo
  async getTodoById(id) {
    const command = new GetCommand({
      TableName: TABLE_NAME,
      Key: { id },
    });

    const result = await ddbDocClient.send(command);
    return result.Item;
  }

  toggleTodoStatus(id) {
    const todo = this.getTodoById(id);

    if (!todo) return null;

    todo.isCompleted = !todo.isCompleted;
    return todo;
  }
  //update todo
  async updateTodo(id, todoData) {
    const expressionParts = [];
    const expressionNames = {};
    const expressionValues = {};

    if (todoData.title !== undefined) {
      expressionParts.push("#t = :title");
      expressionNames["#t"] = "title";
      expressionValues[":title"] = todoData.title;
    }

    if (todoData.description !== undefined) {
      expressionParts.push("#d = :description");
      expressionNames["#d"] = "description";
      expressionValues[":description"] = todoData.description;
    }

    if (todoData.priority !== undefined) {
      expressionParts.push("#p = :priority");
      expressionNames["#p"] = "priority";
      expressionValues[":priority"] = todoData.priority;
    }

    if (todoData.completed !== undefined) {
      expressionParts.push("#c = :isCompleted");
      expressionNames["#c"] = "isCompleted";
      expressionValues[":isCompleted"] = todoData.isCompleted;
    }

    if (expressionParts.length === 0) {
      throw new Error("No valid fields provided for update.");
    }

    const command = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { id },
      UpdateExpression: `SET ${expressionParts.join(", ")}`,
      ExpressionAttributeNames: expressionNames,
      ExpressionAttributeValues: expressionValues,
      ReturnValues: "ALL_NEW",
    });

    const result = await ddbDocClient.send(command);
    return result.Attributes;
  }

  //delete todo
  async deleteTodo(id) {
    const command = new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { id },
    });

    await ddbDocClient.send(command);
    return true;
  }
}

const todoServices = new Todo();
module.exports = todoServices;
