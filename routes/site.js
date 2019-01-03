const express = require('express')
const router = express.Router()
const School = require('../models/model')

//GET ALL TRACKED DATA
router.get('/:name', (req, res) => {
    School.findOne({
        name: req.params.name
    }, (err, schools) => {
        if (err) return res.status(500).json({
            msg: 'There was a problem getting tracked questions'
        })

        if (!schools) {
            res.status(403).json({
                msg: 'No tracked questions'
            })
        } else {
            res.status(200).json(schools)
        }

    })
})

//POST DATA
router.post('/track', (req, res) => {
    const {
        name,
        question,
        qid,
        clicks,
        opens,
        closes
    } = req.body
    req.headers["content-type"] == 'application/json'
    req.headers["access-control-allow-origin"] == '*'
    School.findOne({
        name
    }, (err, school) => {
        if (err) return res.status(500).json('There was a problem finding question')

        if (!school) {
            const newSchool = new School({
                name,
                questions: [{
                    qid,
                    question,
                    clicks,
                    opens,
                    closes
                }]
            })
            newSchool.save().then((result) => {
                res.send('successfully added')
            }).catch((err) => {
                res.send(err)
            })
        } else if (school) {

            var quest = school.questions.find(x => x.qid === qid)

            if(quest) {
                quest.clicks = (parseInt(quest.clicks) + parseInt(clicks))
                quest.opens = (parseInt(quest.opens) + parseInt(opens))
                quest.closes = (parseInt(quest.closes) + parseInt(closes))

                school.save().then(() => {
                    res.send('updated successfully');
                })
            } else {
                school.questions.push({
                    qid,
                    question,
                    clicks,
                    opens,
                    closes
                })
    
                school.save().then(() => {
                    res.send('added another question')
                })
            }
            
        } else {
            // Questions.findOneAndUpdate({
            //     qid,
            //     question
            // }, {
            //     clicks: (parseInt(clicks) + parseInt(quest.clicks)),
            //     opens: (parseInt(opens) + parseInt(quest.opens)),
            //     closes: (parseInt(closes) + parseInt(quest.closes))
            // }, {
            //     new: true
            // }, (err, question) => {
            //     if (err) return res.send(err);

            //     res.send('Update successful');
            // })
        }
    })
})




module.exports = router