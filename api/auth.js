module.exports = (req, res) => {
  res.json({ token: Date.now() })
}
