const reviewDao = require("../models/review_dao");

const reviewService = async (userId, beverageId, content, score) => {
  await reviewDao.createReview(userId, beverageId, content, score);
};

const GetReviewService = async (beverageId) => {
  return await reviewDao.getReview(beverageId);
};

const deleteReviewService = async (userId, reviewId) => {
  await reviewDao.deleteReview(userId, reviewId);
};

module.exports = {
  reviewService,
  GetReviewService,
  deleteReviewService,
};
