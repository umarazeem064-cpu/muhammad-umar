import React, { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, CheckCircle2, Send } from 'lucide-react';
import { UserReview } from '../types';
import { Language, TRANSLATIONS } from '../data/translations';

interface Props {
  language: Language;
}

const INITIAL_REVIEWS: UserReview[] = [
  {
    id: 'rev-1',
    name: 'Hamza Farooq',
    rating: 5,
    date: '2 days ago',
    comment: 'Best pizza in Paragon City Lahore by far! The Cheese Stuffed Crust Chicken Tikka was piping hot and delivery reached Imperial Garden Homes in under 35 minutes.',
    favoriteItem: 'Chicken Tikka Cheese Stuffed Pizza',
    verifiedOrder: true
  },
  {
    id: 'rev-2',
    name: 'Ayesha Siddiqui',
    rating: 5,
    date: '4 days ago',
    comment: 'We ordered Family Deal FD#4 for our weekend get-together. The 2 Large Pizzas and 8 Hot Wings were super fresh. Their garlic mayo dip is unbelievable!',
    favoriteItem: 'Family Feast Deal FD#4',
    verifiedOrder: true
  },
  {
    id: 'rev-3',
    name: 'Bilal Hassan',
    rating: 5,
    date: '1 week ago',
    comment: 'The Jumbo Grilled Burger and Arabian Chicken Shawarma are incredible. Clean, professional packaging and courteous rider.',
    favoriteItem: 'Jumbo Grilled Burger Value Deal',
    verifiedOrder: true
  },
  {
    id: 'rev-4',
    name: 'Zainab Imran',
    rating: 4,
    date: '2 weeks ago',
    comment: 'The Peri Peri Grilled Chicken is tender, juicy, and spicy. Loved the garlic bread on the side. Will order again for sure.',
    favoriteItem: 'Original Peri Peri Grilled Chicken (Full)',
    verifiedOrder: true
  }
];

export const ReviewsSection: React.FC<Props> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [reviews, setReviews] = useState<UserReview[]>(INITIAL_REVIEWS);
  const [newName, setNewName] = useState('');
  const [newRating, setNewRating] = useState<number>(5);
  const [newComment, setNewComment] = useState('');
  const [newFavItem, setNewFavItem] = useState('Chicken Tikka Pizza');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const newRev: UserReview = {
      id: 'rev-' + Date.now(),
      name: newName.trim(),
      rating: newRating,
      date: 'Just now',
      comment: newComment.trim(),
      favoriteItem: newFavItem,
      verifiedOrder: true
    };

    setReviews([newRev, ...reviews]);
    setNewName('');
    setNewComment('');
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <section id="reviews-section" className="py-16 bg-slate-100/70 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Heading & Aggregate Rating */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
              <span>Customer Satisfaction Index</span>
              <span>·</span>
              <span>Paragon City & Barki Road</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight font-heading text-slate-900 dark:text-white">
              {t.reviewsTitle}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Authentic reviews from families and food lovers in Paragon City, Imperial Garden Homes, and Barki Road Lahore.
            </p>
          </div>

          {/* Rating Scorecard */}
          <div className="flex items-center gap-5 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm shrink-0">
            <div className="text-center pr-5 border-r border-slate-200 dark:border-slate-800">
              <span className="text-3xl font-black text-slate-900 dark:text-white font-heading tabular-nums">
                4.8
              </span>
              <div className="flex items-center justify-center gap-0.5 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">864 reviews</span>
            </div>

            <div className="text-xs space-y-1 text-slate-500 dark:text-slate-400">
              <div className="flex items-center justify-between gap-4">
                <span>Food Freshness:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums">4.9 / 5</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Delivery Speed:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums">4.8 / 5</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Portion Value:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums">4.9 / 5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid & Feedback Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Customer Reviews Feed (7 Columns) */}
          <div className="lg:col-span-7 space-y-4">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {rev.name}
                      </h4>
                      {rev.verifiedOrder && (
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Verified Order</span>
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 tabular-nums">{rev.date}</span>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-slate-200 text-slate-200 dark:fill-slate-700 dark:text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  "{rev.comment}"
                </p>

                {rev.favoriteItem && (
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                    <span className="text-slate-400">Favorite Dish:</span>{' '}
                    <span className="font-semibold text-red-600 dark:text-red-400">
                      {rev.favoriteItem}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Interactive Feedback Submission Form (5 Columns) */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t.leaveReview}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Your direct feedback helps us keep quality high and service blazing fast.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
                  Thank you for your review!
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  Your review has been posted and 50 bonus Pizza Points have been added to your profile.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Daniyal Khan"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Rating Stars Select */}
                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Star Rating (1 - 5)
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="p-1 hover:scale-110 transition-transform focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newRating
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-slate-200 text-slate-200 dark:fill-slate-700 dark:text-slate-700'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-2 tabular-nums">
                      {newRating} / 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Favorite Dish / Pizza Ordered
                  </label>
                  <input
                    type="text"
                    value={newFavItem}
                    onChange={(e) => setNewFavItem(e.target.value)}
                    placeholder="e.g. Chicken Tikka Pizza, Zinger Burger"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Your Review & Experience *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Tell us how the food taste and delivery speed was..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-98"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.submitFeedback}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
