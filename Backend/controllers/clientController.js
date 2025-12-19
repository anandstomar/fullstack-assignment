import Client from '../models/Client.js';
import cloudinary from '../utils/cloudinary.js';

// Get all clients
export const getClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch clients' });
  }
};

// Create a new client
export const createClient = async (req, res) => {
  try {
    const { name, designation, description } = req.body;
    if (!req.file) return res.status(400).json({ error: 'Image is required' });
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'clients',
      width: 150,
      height: 150,
      crop: 'fill',
      access_mode: 'public',
    });
    const client = new Client({
      name,
      designation,
      description,
      image: result.secure_url,
    });
    await client.save();
    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create client' });
  }
};

// Delete a client
export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    await Client.findByIdAndDelete(id);
    res.json({ message: 'Client deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete client' });
  }
};

// Update a client (optional, not implemented here) 