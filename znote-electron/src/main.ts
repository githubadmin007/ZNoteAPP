import { app, BrowserWindow, Notification, globalShortcut } from "electron";
import * as path from "path";

let mainWindow: BrowserWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1500,
        height: 800,
        alwaysOnTop: true,
        // fullscreen: true,
        minimizable: false,
        // maximizable: false,
        // closable: false,
        autoHideMenuBar: true,
        title: "ZNote"
        // webPreferences: {
        //     preload: path.join(__dirname, "preload.js"),
        // },
    });
    // mainWindow.loadFile(path.join(__dirname, "../index.html"));
    mainWindow.loadFile(path.join(__dirname, "./znote/index.html"));
    // mainWindow.loadURL("http://zhujh.vip/index.html");
}


app.whenReady().then(() => {
    globalShortcut.register('CommandOrControl+Space', () => {
        if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            mainWindow.show();
        }
    })
}).then(() => {
    createWindow();

    app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
    // showNotification();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

function showNotification() {
    const notification = {
        title: 'Basic Notification',
        body: 'Notification from the Main process'
    }
    new Notification(notification).show()
}