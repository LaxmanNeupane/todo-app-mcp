let todos = [];

exports.getTodos = (req, res) => {
  res.json(todos);
};

exports.createTodo = (req, res) => {
  const todo = req.body;
  todos.push(todo);
  res.json(todo);
};