module.exports = ({ rates }) => {
  const get = async (req, res, next) => {
    try {
      res.json(await rates.get())
    } catch (error) {
      next(error)
    }
  }

  return {
    get
  }
}
