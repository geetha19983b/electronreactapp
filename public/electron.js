const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const ipc = electron.ipcMain;
const isDev = require('electron-is-dev');
const powershell = require('node-powershell');
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900, height: 680, webPreferences: {
      nodeIntegration: true,
      preload: __dirname + '/preload.js'
    }
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipc.on('exec-shellscript', function (event, data) {
  // Create the PS Instance
  console.log(data);
  let ps = new powershell({
    executionPolicy: 'Bypass',
    noProfile: true
  });

  ps.addCommand(data.path)
    .then(() => ps.addParameters([
      data.params.map(parm => {
       return `{${parm.paramName} : ${parm.paramValue}},`
      })
    ]));
    console.log(ps.params);
  ps.invoke()
    .then(output => {
      //console.log(output)
      const responseop = {
        ...data,
        output: output
      };
      //console.log(responseop);
      mainWindow.webContents.send("scriptResults", responseop);
    })
    .catch(err => {
      console.error(err);
      const responseop = {
        ...data,
        output: err
      };
      mainWindow.webContents.send('scriptResults', responseop);
      ps.dispose()
    })


});

ipc.on('exec-shellscript2', function (event, data) {
  // Create the PS Instance
  let ps = new powershell({
    executionPolicy: 'Bypass',
    noProfile: true
  })

  ps.addCommand("C:\\Users\\Geetha\\codes\\electron\\electron-react-app\\public\\Get-Drives.ps1", [
    // ps.addCommand("./Get-Drives", [
    { ComputerName: data }
  ])

  ps.invoke()
    .then(output => {
      console.log(output)
      mainWindow.webContents.send("scriptResults", `${output}`);
    })
    .catch(err => {
      console.error(err)
      mainWindow.webContents.send('scriptResults', `error:${err}`);
      ps.dispose()
    })


});

ipc.on('exec-shellscript1', function (event, data) {
  console.log('starting!' + JSON.stringify(data));
  var spawn = require("child_process").spawn, child;
  const scriptfile = "C:\\Users\\Geetha\\codes\\electron\\electron-react-app\\public\\Get-Drives.ps1 -ComputerName";
  const compName = " " + data;
  const script = scriptfile.concat(compName);

  child = spawn("powershell.exe", [script]);
  child.stdout.on("data", function (data) {
    console.log("Powershell Data: " + data);
    // mainWindow.webContents.send('scriptResults',data);
    mainWindow.webContents.send("scriptResults", `${data}`);
  });
  child.stderr.on("data", function (data) {
    console.log("Powershell Errors: " + data);
    mainWindow.webContents.send('scriptResults', `error:${data}`);
  });
  child.on("exit", function () {
    console.log("Powershell Script finished");
  });


  child.stdin.end(); //end input
});

// function executePSScript(compName){
//   // Create the PS Instance
//   let ps = new powershell({
//     executionPolicy: 'Bypass',
//     noProfile: true
//   })

//   //ps.addCommand("\"Roads? Where we're going, we don't need roads.\"")
//   //ps.addCommand("Get-Process -Name electron")

//   ps.addCommand("./Test-Power", [
//     { GigaWatts: 1.0 }
//   ])
//   let computer = compName;

//   //ps.addCommand("./Get-Drives", [
//    // { ComputerName: computer }
//   //])
//   // Pull the Trigger
//   ps.invoke()
//     .then(output => {
//       console.log(output)
//       let data = JSON.parse(output)
//       console.log(data);
//     })
//     .catch(err => {
//       console.error(err)
//       ps.dispose()
//     })
// }