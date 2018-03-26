var express = require('express');
var redis = require('redis');
var router = express.Router();
var client = redis.createClient();

/* GET home page. API*/
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

/**
 * GET API - to start a long running task
 * We used GET just to make testing simple.
 * We used itiration as long running task, just in case we can use any long running process like uploading data to db etc... 
 */
router.get('/start', (req, res) => {

    /**
     * To store Process.Pid with reference to the UserId(or any primary key) in Redis
     * We will get UserId easily as body parameter 
     * This will help this user to run the cancel API to cancel this long-running process.
     * Only the user who had stated this long running process can cancle this process in case he/she want.
     */
    client.set( /* UserId */ "7y7f4ec982u2dhjh92dh0q9", /* Process Pid */ process.pid, (err, reply) => {
        console.log(err);
        console.log(reply);
    });

    /**
     * iteration as a sample long running process
     */
    for (let i = 0; i < 1e7; i++) {
        console.log(i + "." + process.pid);
        //process.stdout.write(" Value - " + i + " PID - " + process.pid)
    }

    res.send("Done starting !! " + process.pid);
});

/**
 * GET API - to suspend the long-running task 
 * We will get UserId easily as body parameter 
 * This API will be effecting only for the userID which had stated the long-running task 
 */
router.get('/suspend', (req, res) => {

    console.log("Starting.....%", process.pid);

    /**
     * Geting the Process.Pid of the process in which the long running task is currecntly processing.
     */
    client.get( /* UserId */ "7y7f4ec982u2dhjh92dh0q9", (err, reply) => {
        if (!err && reply) {
            /**
             * Killing the process in which the long-running process is running
             * This will generate a event *disconnect* which will be handled by the cluter(parent) to run a new worker (process)
             */
            process.kill(reply, 'SIGTERM');
        } else {
            /**
             * In case if there is no long-running process executed by the UserId.
             */
            console.log("Nothing to kill");
        }

    });

    /**
     * After successfuly killing the long-running task process, now deleting the stored UserId/Process.Pid from redis server. 
     */
    client.del( /* UserId */ "7y7f4ec982u2dhjh92dh0q9", (err, reply) => {
        console.log("Removed Key - %s..%s", err, reply);
    });

    /**
     * Now finally responsing after successfull processing.
     */
    res.send("Done suspending !! ");

});

/**
 * GET API - A dummy API to just test that everything working fine, all workers are active. 
 */
router.get('/hello', (req, res) => {
    res.sendStatus(200);
});

module.exports = router;