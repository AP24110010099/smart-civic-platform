const express = require("express");
const router = express.Router();
const Issue = require("../models/issue");

// POST - create issue
router.post("/", async (req, res) => {
  try {
    const issue = new Issue({
      ...req.body,
      rewardPoints: 10 // ⭐ auto reward on submit
    });

    await issue.save();
    res.json(issue);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET - get all issues
router.get("/", async (req, res) => {
  try {
    const issues = await Issue.find();
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - update issue
router.put("/:id", async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    // ⭐ bonus points when resolved
    if (req.body.status === "resolved" && issue.status !== "resolved") {
      issue.rewardPoints += 5;
    }

    issue.status = req.body.status || issue.status;

    await issue.save();
    res.json(issue);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: Remove an issue
router.delete("/:id", async (req, res) => {
  try {
    const deletedIssue = await Issue.findByIdAndDelete(req.params.id);

    if (!deletedIssue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.json({ message: "Issue deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




module.exports = router;

