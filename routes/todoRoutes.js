import express from "express";
import Todo from "../models/Todo.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const todos = await Todo.find({ user: req.user });
  res.json(todos);
});

router.post("/", auth, async (req, res) => {
  const todo = await Todo.create({
    title: req.body.title,
    user: req.user
  });
  res.json(todo);
});

router.put("/:id", auth, async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(todo);
});

router.delete("/:id", auth, async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

export default router;
