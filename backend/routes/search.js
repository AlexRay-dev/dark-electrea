const express = require('express')
const router = new express.Router()

const db = require('../queries/search')

router.route('/api/search/bands')
  .get(db.searchBand)
  .post(db.searchBandsWithFilters)

router.route('/api/search/albums')
  // .get(db.searchAlbum)
  .post(db.searchAlbumsWithFilters)

module.exports = router
