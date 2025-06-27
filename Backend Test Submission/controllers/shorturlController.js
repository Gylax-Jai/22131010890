const Url = require('../models/Url');
const generateShortcode = require('../utils/generateShortcode');
const Log = require('../utils/loggerClient');

exports.createShortUrl = async (req, res) => {
  const { url, validity, shortcode } = req.body || {};
  if (!url) {
    await Log("backend", "error", "createShortUrl", "Missing URL in request body");
    return res.status(400).json({ error: 'URL is required' });
  }

  let code = shortcode || generateShortcode();

  const existing = await Url.findOne({ shortcode: code });
  if (existing) {
    await Log("backend", "error", "createShortUrl", "Shortcode already exists");
    return res.status(409).json({ error: 'Shortcode already exists' });
  }

  const expiresAt = new Date(Date.now() + ((validity || 30) * 60000));

  const newUrl = new Url({ originalUrl: url, shortcode: code, expiresAt });
  await newUrl.save();

  await Log("backend", "info", "createShortUrl", `Shortlink created: ${code}`);
  res.status(201).json({ shortLink: `http://localhost:3000/${code}`, expiry: expiresAt.toISOString() });
};

exports.redirectShortUrl = async (req, res) => {
  const { shortcode } = req.params;
  const urlEntry = await Url.findOne({ shortcode });

  if (!urlEntry) {
    await Log("backend", "error", "redirectShortUrl", "Shortcode not found");
    return res.status(404).json({ error: 'Shortcode not found' });
  }

  if (new Date() > urlEntry.expiresAt) {
    await Log("backend", "error", "redirectShortUrl", "Link expired");
    return res.status(410).json({ error: 'Link expired' });
  }

  const location = req.ip;
  const referrer = req.get('Referrer') || 'Direct';

  urlEntry.clickStats.push({ timestamp: new Date(), referrer, location });
  urlEntry.clickCount++;
  await urlEntry.save();

  await Log("backend", "info", "redirectShortUrl", `Redirected to: ${urlEntry.originalUrl}`);
  res.redirect(urlEntry.originalUrl);
};

exports.getStats = async (req, res) => {
  const { shortcode } = req.params;
  const urlEntry = await Url.findOne({ shortcode });

  if (!urlEntry) {
    await Log("backend", "error", "getStats", "Shortcode not found");
    return res.status(404).json({ error: 'Shortcode not found' });
  }

  await Log("backend", "info", "getStats", `Stats fetched for: ${shortcode}`);
  res.json({
    originalUrl: urlEntry.originalUrl,
    createdAt: urlEntry.createdAt,
    expiresAt: urlEntry.expiresAt,
    clickCount: urlEntry.clickCount,
    clickStats: urlEntry.clickStats
  });
};
