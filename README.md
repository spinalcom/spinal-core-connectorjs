## What is spinalcore?

SpinalCore is a library built for Fog computing that synchronizes objects in real-time.

## Features

- **Fog computing ready** - SpinalCore runs on IoT gateways, development cards, edge servers and provide every fog application components required: database, event manager, replication system, etc.
- **Simple & Fast** - SpinalCore allows you to design and implement flexible IoT system in minutes. It offer open, simple and documented APIs.
- **Interoperable** - SpinalCore enable powerful virtualization, object management, data replication and workflow orchestration between all your devices and applications.

## Installation

```
npm install -S https://github.com/spinalcom/spinal-core-connectorjs
```

## QuickStart

For a quick start, checkout the files in the folder [example](https://github.com/spinalcom/spinal-core-connectorjs/blob/master/example):

- [publisher](https://github.com/spinalcom/spinal-core-connectorjs/blob/master/example/publisher.ts)
- [publisherWithAuthOrgan](https://github.com/spinalcom/spinal-core-connectorjs/blob/master/example/publisherWithAuthOrgan.ts)
- [subcriber](https://github.com/spinalcom/spinal-core-connectorjs/blob/master/example/subscriber.ts)
- [subscriberWithAuthOrgan](https://github.com/spinalcom/spinal-core-connectorjs/blob/master/example/subscriberWithAuthOrgan.ts)
- [subscriberWithAuthBrowser](https://github.com/spinalcom/spinal-core-connectorjs/blob/master/example/subscriberWithAuthBrowser.ts)

## Connection to the hub : outages and restarts

The hub keeps its sessions in memory, so a restarted hub no longer knows the
session of a program. The connection keeps going instead of giving up
(`src/FileSystem/HubConnection.ts`) :

- **the hub is not up yet** : the connection waits for it.
- **the hub does not answer** : the program keeps running with what it has in
  memory ; what could not be sent is kept, and sent once the hub answers again.
  A long poll left unanswered (a dead TCP connection) is sent again.
- **the hub restarted** : the connection opens a new session with the
  credentials of `spinalCore.connect`, sends what changed meanwhile, then loads
  back the models in memory. They keep their instances, so the references and
  the binds of the program stay valid, they get the changes the other programs
  made meanwhile, and the hub sends their changes again.
- a restarting hub drops the changes it acknowledged during its last seconds :
  the connection sends again the ones the program made during the last
  `replay_window` before the hub stopped answering.

The `[hub]` lines of the logs follow it, and `getConnectionStatus()` gives its
state (`connecting`, `connected`, `disconnected`, `reconnecting`, `resyncing`,
`closed`) :

```ts
const conn = spinalCore.connect(`http://${user}:${password}@${host}:${port}/`);
conn.getConnectionStatus(); // { state, since, hub, disconnections, sessionsOpened, lastError, lastResync }

// called on every change of state ; the default one shows the popup in a browser
FileSystem.onConnectionStateChange = (status, fs) => console.log(status.state);
```

`FileSystem.onConnectionError(code)` is now only called when the connection
gives up : `auto_reconnect` turned off, or a connection opened with a session id
(no credentials to open another one). Its default handler still exits the
process in Node, so a handler exiting on any code no longer stops the program
during an outage it recovers from.

```ts
FileSystem.auto_reconnect = true;       // false : give up like before (after _timeout_reconnect, or when the hub restarts)
FileSystem.poll_timeout = 120000;       // ms a long poll may stay unanswered, the hub answers them every 30s
FileSystem.send_timeout = 600000;       // ms a request sending data may stay unanswered, 0 waits forever
FileSystem.reconnect_max_delay = 10000; // longest wait between two attempts to reach the hub
FileSystem.resync_batch_size = 1000;    // models loaded back per request after the hub restarted
FileSystem.replay_window = 10000;       // ms of local changes sent again after the hub restarted, 0 disables it
```

What the program cannot make up for, the hub has to : a restarting hub also
drops some of the models created during its last 5 to 15 seconds, and a crashed
hub loses everything since its last dump. The program then mirrors what the hub
kept, and logs the models of its memory the hub no longer has.

`npm test` runs the connection through restarts of a throwaway hub, started on
free ports with an empty database : set `SPINALHUB_BIN` to a spinalhub binary.

## API Documentation

https://spinalcom.github.io/spinal-core-connectorjs/

## More info

Visit us in [www.spinalcom.com](http://www.spinalcom.com)

## License

Please read all of the following terms and conditions of the Free Software license Agreement ("Agreement") carefully.
This Agreement is a legally binding contract between the Licensee (as defined below) and SpinalCom that sets forth the terms and conditions that govern your use of the Program. By installing and/or using the Program, you agree to abide by all the terms and conditions stated or referenced herein.
If you do not agree to abide by these terms and conditions, do not demonstrate your acceptance and do not install or use the Program.

[Full License Agreement](http://resources.spinalcom.com/licenses.pdf)
