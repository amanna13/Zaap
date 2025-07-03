const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const { databases } = require('./appwriteClient');
const { ID } = require('node-appwrite');

// Simple CORS for local development
app.use(cors());
app.use(bodyParser.json());

const DB_ID = process.env.APPWRITE_DB_ID;
const COLLECTION_ID = process.env.APPWRITE_CHILDREN_COLLECTION_ID;
const USDC_ADDRESS = process.env.USDC_ADDRESS || '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238'; // Sepolia USDC

console.log('USDC Address configured:', USDC_ADDRESS);

// Dynamic delegator storage
let currentDelegator = null;

// Helper: Validate Ethereum address
function isValidEthAddress(addr) {
  return typeof addr === 'string' && /^0x[a-fA-F0-9]{40}$/.test(addr) && addr.length === 42;
}

// Home route
app.get('/', (req, res) => {
  res.send('Zaap Backend API is running locally');
});

// POST /api/set-delegator - Set delegator address
app.post('/api/set-delegator', (req, res) => {
  try {
    const { delegator } = req.body;
    
    if (!isValidEthAddress(delegator)) {
      return res.status(400).json({ 
        error: 'Invalid delegator address',
        message: 'Delegator address must be a valid Ethereum address'
      });
    }
    
    currentDelegator = delegator;
    console.log('Delegator updated to:', delegator);
    
    return res.json({ 
      success: true, 
      delegator,
      message: 'Delegator address updated successfully'
    });
  } catch (err) {
    console.error('Set delegator error:', err);
    return res.status(500).json({ error: 'Failed to set delegator' });
  }
});

// GET /api/delegator - Get current delegator
app.get('/api/delegator', (req, res) => {
  if (!currentDelegator) {
    return res.status(404).json({ 
      error: 'No delegator set',
      message: 'Please set delegator address first using POST /api/set-delegator' 
    });
  }
  return res.json({ 
    delegator: currentDelegator,
    success: true 
  });
});

// POST /api/generate-qr - Generate QR code data
app.post('/api/generate-qr', async (req, res) => {
  try {
    const { delegator, maxAmount, alias } = req.body;
    
    // Use provided delegator or current stored delegator
    const finalDelegator = delegator || currentDelegator;
    
    if (!isValidEthAddress(finalDelegator)) {
      return res.status(400).json({ 
        error: 'Invalid or missing delegator address',
        message: 'Please provide a valid delegator address or set one using /api/set-delegator'
      });
    }
    
    const max = Number(maxAmount);
    if (isNaN(max) || max <= 0) {
      return res.status(400).json({ error: 'Invalid maxAmount' });
    }
    
    const weeklyLimit = Math.floor(max * 0.2);
    
    // Update current delegator if provided
    if (delegator && delegator !== currentDelegator) {
      currentDelegator = delegator;
      console.log('Delegator updated to:', delegator);
    }
    
    // Create QR payload with delegation restrictions
    const qrPayload = {
      delegator: finalDelegator,
      token: USDC_ADDRESS, // Always set to Sepolia USDC
      maxAmount: max,
      weeklyLimit,
      timestamp: Date.now(),
      alias: alias || '',
      restrictions: {
        allowedToken: USDC_ADDRESS,
        weeklySpendingLimit: weeklyLimit,
        description: `Max: ${max} USDC, Weekly Limit: ${weeklyLimit} USDC`
      }
    };
    
    console.log('Generated QR payload:', qrPayload);
    console.log('Token in QR:', qrPayload.token);
    
    // Validate that token is set before returning
    if (!qrPayload.token) {
      console.error('USDC_ADDRESS not configured properly');
      return res.status(500).json({ error: 'Token configuration error' });
    }
    
    return res.json({ success: true, qrData: JSON.stringify(qrPayload) });
  } catch (err) {
    console.error('Generate QR error:', err);
    return res.status(500).json({ error: 'Failed to generate QR' });
  }
});

// POST /api/connect-child - Connect a child account
app.post('/api/connect-child', async (req, res) => {
  try {
    console.log('Connect child request:', req.body);
    
    // Extract data from request body
    let { childAddress, address, walletAddress, delegator, token, maxAmount, timestamp, alias } = req.body;
    
    // Accept address from multiple possible keys
    const finalChildAddress = childAddress || address || walletAddress;
    
    if (!isValidEthAddress(finalChildAddress)) {
      console.error('Invalid child address:', finalChildAddress);
      return res.status(400).json({ 
        error: 'Invalid child address', 
        message: 'Child address must be a valid Ethereum address' 
      });
    }
    
    if (!isValidEthAddress(delegator)) {
      console.error('Invalid delegator address:', delegator);
      return res.status(400).json({ 
        error: 'Invalid delegator address',
        message: 'Delegator address must be a valid Ethereum address'
      });
    }
    
    // Only allow USDC token
    if (!token || token.toLowerCase() !== USDC_ADDRESS.toLowerCase()) {
      console.error('Invalid token address:', token, 'Expected:', USDC_ADDRESS);
      return res.status(400).json({ 
        error: 'Invalid token', 
        message: 'Only USDC token is allowed for child accounts' 
      });
    }
    
    // Validate maxAmount
    const max = Number(maxAmount);
    if (isNaN(max) || max <= 0) {
      console.error('Invalid maxAmount:', maxAmount);
      return res.status(400).json({ 
        error: 'Invalid maxAmount',
        message: 'Maximum amount must be a positive number'
      });
    }
    
    // Calculate weekly limit (20% of maxAmount)
    const weeklyLimit = Math.floor(max * 0.2);
    
    // Check if child already exists
    try {
      const existingChildren = await databases.listDocuments(DB_ID, COLLECTION_ID);
      const existingChild = existingChildren.documents.find(child => 
        child.address.toLowerCase() === finalChildAddress.toLowerCase()
      );
      
      if (existingChild) {
        console.log('Child already exists, updating...');
        const updatedChild = await databases.updateDocument(DB_ID, COLLECTION_ID, existingChild.$id, {
          delegator,
          token: USDC_ADDRESS,
          maxAmount: max,
          weeklyLimit,
          alias: alias || existingChild.alias || '',
          status: 'active',
          connectedAt: timestamp || Date.now(),
          balance: max,
          updatedAt: Date.now(),
        });
        console.log('Child updated successfully:', updatedChild);
        return res.json({ 
          success: true, 
          child: updatedChild, 
          updated: true,
          message: 'Child account updated successfully'
        });
      }
    } catch (error) {
      console.log('No existing child found, creating new one...');
    }
    
    // Save child to Appwrite
    const childDoc = await databases.createDocument(DB_ID, COLLECTION_ID, ID.unique(), {
      address: finalChildAddress,
      delegator,
      token: USDC_ADDRESS,
      maxAmount: max,
      weeklyLimit,
      alias: alias || '',
      status: 'active',
      connectedAt: timestamp || Date.now(),
      balance: max,
      spent: 0,
      createdAt: Date.now(),
    });
    
    console.log('Child connected successfully:', childDoc);
    return res.json({ 
      success: true, 
      child: childDoc, 
      created: true,
      message: 'Child account connected successfully'
    });
  } catch (err) {
    console.error('Connect child error:', err);
    return res.status(500).json({ 
      error: 'Failed to connect child', 
      details: err.message,
      message: 'Internal server error while connecting child account'
    });
  }
});

// GET /api/children - List all children
app.get('/api/children', async (req, res) => {
  try {
    console.log('Fetching children from database...');
    
    if (!databases) {
      console.error('Database connection not available');
      return res.status(200).json([]);
    }
    
    const result = await databases.listDocuments(DB_ID, COLLECTION_ID);
    console.log('Children fetched successfully:', result.documents.length, 'documents');
    
    // Transform documents to ensure consistent format
    const children = result.documents.map(doc => ({
      id: doc.$id,
      address: doc.address,
      alias: doc.alias || '',
      balance: doc.balance || 0,
      weeklyLimit: doc.weeklyLimit || 0,
      spent: doc.spent || 0,
      status: doc.status || 'active',
      totalUSDC: doc.maxAmount || 0,
      maxAmount: doc.maxAmount || 0,
      delegator: doc.delegator,
      token: doc.token,
      connectedAt: doc.connectedAt,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    }));
    
    return res.status(200).json(children);
  } catch (err) {
    console.error('List children error:', err);
    return res.status(200).json([]);
  }
});

// PUT /api/children/{address} - Update child account details
app.put('/api/children/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const updates = req.body;
    
    if (!isValidEthAddress(address)) {
      return res.status(400).json({ error: 'Invalid address format' });
    }
    
    // Find child by address
    const result = await databases.listDocuments(DB_ID, COLLECTION_ID);
    const child = result.documents.find(child => 
      child.address.toLowerCase() === address.toLowerCase()
    );
    
    if (!child) {
      return res.status(404).json({ error: 'Child not found' });
    }
    
    // Update document
    const updatedChild = await databases.updateDocument(
      DB_ID, 
      COLLECTION_ID, 
      child.$id, 
      {
        ...updates,
        updatedAt: Date.now()
      }
    );
    
    return res.json({ 
      success: true, 
      child: updatedChild,
      message: 'Child updated successfully'
    });
  } catch (err) {
    console.error('Update child error:', err);
    return res.status(500).json({ error: 'Failed to update child' });
  }
});

// POST /api/children/{address}/add-funds - Add funds to child account
app.post('/api/children/:address/add-funds', async (req, res) => {
  try {
    const { address } = req.params;
    const { amount } = req.body;
    
    if (!isValidEthAddress(address)) {
      return res.status(400).json({ error: 'Invalid address format' });
    }
    
    const addAmount = Number(amount);
    if (isNaN(addAmount) || addAmount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }
    
    // Find child by address
    const result = await databases.listDocuments(DB_ID, COLLECTION_ID);
    const child = result.documents.find(child => 
      child.address.toLowerCase() === address.toLowerCase()
    );
    
    if (!child) {
      return res.status(404).json({ error: 'Child not found' });
    }
    
    // Update child's balance and maxAmount
    const newBalance = (child.balance || 0) + addAmount;
    const newMaxAmount = (child.maxAmount || 0) + addAmount;
    
    const updatedChild = await databases.updateDocument(
      DB_ID, 
      COLLECTION_ID, 
      child.$id, 
      {
        balance: newBalance,
        maxAmount: newMaxAmount,
        totalUSDC: newMaxAmount,
        updatedAt: Date.now()
      }
    );
    
    return res.json({ 
      success: true, 
      child: {
        ...updatedChild,
        balance: newBalance,
        maxAmount: newMaxAmount,
        totalUSDC: newMaxAmount
      },
      message: `Added ${addAmount} USDC to ${child.alias || 'child'}'s account`
    });
  } catch (err) {
    console.error('Add funds error:', err);
    return res.status(500).json({ error: 'Failed to add funds' });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Zaap Backend running locally on port ${PORT}`);
});

module.exports = app;
