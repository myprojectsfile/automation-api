var express = require('express');
var router = express.Router();
const sql = require('mssql')

const config = {
    user: 'pis',
    password: 'Www.bpm0.ir',
    server: '10.1.1.27',
    database: 'eOrganization',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
}



/* GET users listing. */
router.get('/actions', function (req, res, next) {
    new sql.ConnectionPool(config).connect()
    .then(pool => {
        return pool.query(`SELECT ActionCode, ActionName, FarsiDescription FROM Actions WHERE (IsUsedForFCF = 0) AND (IsNeedToResponse = 1)`)
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.send(err);
    });
});

module.exports = router;
