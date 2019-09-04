const Member = require('../models/member')

const getAllMembers = (req, res) => {
  Member.find({})
    /**
     * Why use exec? Because queries are not promises
     * https://mongoosejs.com/docs/promises.html
     */
    .exec()
    .then(members => {
      res.send(members)
    })
    .catch(err => {
      res.status(400).send(err)
    })
}

const getOneMember = (req, res) => {
  Member.findById(req.params.id)
    .exec()
    .then(member => {
      res.send(member)
    })
    .catch(err => {
      res.status(400).send(err)
    })
}

const searchMembers = (req, res) => {
  Member.find(req.query)
    .exec()
    .then(member => {
      res.send(member)
    })
    .catch(err => {
      res.status(400).send(err)
    })
}

const createMember = (req, res) => {
  const member = new Member(req.body)

  member
    .save()
    .then(member => {
      res.send(member)
    })
    .catch(err => {
      res.status(400).send(err)
    })
}

const updateMember = (req, res) => {
  Member.findByIdAndUpdate(
    req.params.id, // id
    req.body, // update
    { new: true }
  ) // options
    .exec()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(400).send(err)
    })
}

const deleteMember = (req, res) => {
  Member.findByIdAndRemove(req.params.id)
    .exec()
    .then(member => {
      if (!member) {
        res.status(404).send()
      }
      res.send(member)
    })
}

module.exports = {
  getOneMember,
  getAllMembers,
  searchMembers,
  createMember,
  updateMember,
  deleteMember,
}
