module.exports = ({ rates }) => {
  const get = async (req, res, next) => {
    try {
      res.set('Cache-Control', 'max-age=3600')
      res.json(await rates.get())
    } catch (error) {
      next(error)
    }
  }

  return {
    get
  }
}
