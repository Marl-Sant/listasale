function hasActiveSubscription(account) {
  // You can adjust the logic based on which statuses you treat as "okay"
  return (
    account.subscriptionStatus === 'active' ||
    account.subscriptionStatus === 'trialing'
  );
}

//I SHOULD HAVE SOMETHING LIKE THE BELOW TO PROTECT ROUTES BASED ON
//THE RETURN OF THE ABOVE
/***
 * const { hasActiveSubscription } = require('../utils/subscription');

router.get('/pro-feature', requireAuth, async (req, res) => {
  if (!hasActiveSubscription(req.user)) {
    return res.status(402).json({ error: 'Subscription required' });
  }

  // ... return pro data
});
 */

module.exports = { hasActiveSubscription };
