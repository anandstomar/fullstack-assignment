import Contact from '../models/Contact.js';

// Submit contact form
export const submitContact = async (req, res) => {
  try {
    const { fullName, email, mobile, city } = req.body;
    if (!fullName || !email || !mobile || !city) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const contact = new Contact({ fullName, email, mobile, city });
    await contact.save();
    res.status(201).json({ message: 'Contact form submitted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
};

// Get all contact submissions (admin)
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contact submissions' });
  }
}; 