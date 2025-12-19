import Newsletter from '../models/Newsletter.js';

// Subscribe to newsletter
export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required' });
    }
    // Prevent duplicate subscriptions
    const exists = await Newsletter.findOne({ email });
    if (exists) {
      return res.status(409).json({ error: 'Email already subscribed' });
    }
    const subscription = new Newsletter({ email });
    await subscription.save();
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to subscribe' });
  }
};

// Get all newsletter subscriptions (admin)
export const getNewsletters = async (req, res) => {
  try {
    const newsletters = await Newsletter.find().sort({ createdAt: -1 });
    res.json(newsletters);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch newsletter subscriptions' });
  }
}; 