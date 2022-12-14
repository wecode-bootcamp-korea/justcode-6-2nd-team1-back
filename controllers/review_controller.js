const reviewService = require("../services/review_service");

const reviewController = async (req, res) => {
  const userId = req.userData.id;
  const beverageId = req.params.id;
  const { content, score } = req.body;

  if (!(userId && beverageId && content && score)) {
    res.status(400).json({ message: "check Input data" });
    return;
  }

  try {
    await reviewService.reviewService(userId, beverageId, content, score);
    res.status(200).json({ message: "review created" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const GetReviewController = async (req, res) => {
  const beverageId = req.params.id;
  try {
    const reviewData = await reviewService.GetReviewService(beverageId);
    res.status(200).json({ reviewData });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json(err.message);
  }
};

const deleteReviewController = async (req, res) => {
  const userId = req.userData.id;
  const reviewId = req.params.id;
  try {
    await reviewService.deleteReviewService(userId, reviewId);
    res.status(200).json("review deleted");
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json(err.message);
  }
};
module.exports = {
  reviewController,
  GetReviewController,
  deleteReviewController,
};
