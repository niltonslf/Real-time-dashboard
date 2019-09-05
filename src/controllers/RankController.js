class RankController {
  index(req, res) {
    res.render('rank.ejs')
  }
}

module.exports = new RankController()
