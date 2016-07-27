var spawn = require('child_process').spawn,
    gulp = require('gulp'),
    githubhook = require('githubhook');

gulp.task('git-pull', function (done) {
    spawn('git', ['pull'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task('deploy', ['git-pull'], function (done) {
    var options = {stdio: 'inherit', cwd: 'NYUmHealth'};
    spawn('python', ['manage.py', 'migrate', '--no-input'], options)
        .on('close', function () {
            spawn('python', ['manage.py', 'collectstatic', '--no-input'], options)
                .on('close', done);
        });
});

// This task runs forever, listening on port 3420 for the webhook from GitHub
gulp.task('githubhook', function () {
    var port = 3422, // 3420 (default) is mapmob-server, 3421 is mapmob-ui
        server = githubhook({host: '127.0.0.1', port: port}),
        repo = 'Recruitment-Interactive',
        branch = 'master',
        event = 'push:' + repo + ':refs/heads/' + branch,
        taskToRun = 'deploy',
        running = 0;
    server.listen();
    server.on(event, function () {
        running++;
        if (running > 1) {
            // Avoid simultaneous runs
            console.log('delaying run #' + running);
        }
        else {
            runGitHubTask();
        }
    });
    // Run as many times as we've received requests
    function runGitHubTask() {
        console.log('running task triggered by githubhook');
        spawn('gulp', [taskToRun], {stdio: 'inherit'})
            .on('close', function () {
                running--;
                if (running) {
                    runGitHubTask();
                }
            });
    }
});
