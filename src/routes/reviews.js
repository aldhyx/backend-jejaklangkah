const ReviewsRouter = require('express').Router();
const { Authentication, isRoleAdmin } = require('../middleware/auth');

const {
  CreateReview,
  DeleteReview,
  UpdateReview,
  GetReviews,
  GetReview,
} = require('../controllers/reviews');

ReviewsRouter.post('/', Authentication, CreateReview);
ReviewsRouter.delete('/:id', Authentication, DeleteReview);
ReviewsRouter.patch('/:id', Authentication, UpdateReview);
ReviewsRouter.get('/', GetReviews);
ReviewsRouter.get('/:id', GetReview);

module.exports = ReviewsRouter;
