const express = require('express')
const {
  getAllMembers,
  createMember,
  searchMembers,
  getOneMember,
  updateMember,
  deleteMember,
} = require('../controllers/member')

const router = express.Router()

router
  .route('/')
  .get(getAllMembers)
  .post(createMember)

router.route('/search').get(searchMembers)

router
  .route('/:id')
  .get(getOneMember)
  .put(updateMember)
  .delete(deleteMember)

module.exports = router
