const reviewDao = require("../models/review_dao");

const reviewService = async (userId, beverageId, content) => {
  await reviewDao.createReview(userId, beverageId, content);
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
