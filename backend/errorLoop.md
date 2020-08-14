```
  node-dev index.js
events.js:187
      throw er; // Unhandled 'error' event
      ^

Error: ENOSPC: System limit for number of file watchers reached, watch '/var/www/html/project-gestion-demenagement/backend/index.js'
    at FSWatcher.<computed> (internal/fs/watchers.js:165:26)
    at Object.watch (fs.js:1345:34)
    at add (/home/etudiant/.npm-packages/lib/node_modules/node-dev/node_modules/filewatcher/index.js:74:34)
    at /home/etudiant/.npm-packages/lib/node_modules/node-dev/node_modules/filewatcher/index.js:93:5
    at FSReqCallback.oncomplete (fs.js:159:5)
Emitted 'error' event on FileWatcher instance at:
    at add (/home/etudiant/.npm-packages/lib/node_modules/node-dev/node_modules/filewatcher/index.js:89:27)
    at /home/etudiant/.npm-packages/lib/node_modules/node-dev/node_modules/filewatcher/index.js:93:5
    at FSReqCallback.oncomplete (fs.js:159:5) {
  errno: -28,
  syscall: 'watch',
  code: 'ENOSPC',
  path: '/var/www/html/project-gestion-demenagement/backend/index.js',
  filename: '/var/www/html/project-gestion-demenagement/backend/index.js'
}

```