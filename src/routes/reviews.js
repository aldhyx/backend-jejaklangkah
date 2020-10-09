const ReviewsRouter = require('express').Router();
const {
  CreateReview,
  DeleteReview,
  UpdateReview,
  GetReviews,
  GetReview,
} = require('../controllers/reviews');

ReviewsRouter.post('/', CreateReview);
ReviewsRouter.delete('/:id', DeleteReview);
ReviewsRouter.patch('/:id', UpdateReview);
ReviewsRouter.get('/', GetReviews);
ReviewsRouter.get('/:id', GetReview);

module.exports = ReviewsRouter;
