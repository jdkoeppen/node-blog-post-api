const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const { BlogPosts } = require("./models");

function lorem() {
  return "lorem ipsum dolor set somethin somethin somethin";
}

BlogPosts.create("Pigs", lorem(), "Something");
BlogPosts.create("Cow", lorem(), "Something");

router.get("/", (req, res) => {
  res.json(BlogPosts.get());
});

router.post("/", jsonParser, (req, res) => {
  const requiredFields = ["title", "content", "author"];
  for (i = 0; i < requiredFields.lengtth; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const post = BlogPosts.create(
    req.body.title,
    req.body.content,
    req.body.author
  );
  res.status(201).json(post);
});

router.put("/:id", jsonParser, (req, res) => {
  const requiredFields = ["id", "title", "content", "author", "publishDate"];
  for (i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = `You did it wrong. Request Params ID \`${
      req.params.id
    }\` and Request Body ID \`${req.body.id}\` must match.`;
    console.error(message);
    return res.status(400).send(message);
  }
  return res.status(204).send(req.body)
});

router.delete("/:id", (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog post \`${req.params.ID}\``);
  res.status(204).end();
})

module.exports = router;