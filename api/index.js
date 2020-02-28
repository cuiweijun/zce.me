// https://zeit.co/guides/deploying-next-and-mysql-with-now

module.exports = (req, res) => {
  res.json({ now: Date.now() })
}
