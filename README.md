# writer-mode

Distraction free plain text editing in VSCode.

![Imgur](https://i.imgur.com/33zYvoE.gif)

To activate use `cmd+shift+p` and type: `Writer mode: Activate`.

Deactivating works the same way: `cmd+shift+p` and `Writer mode: Deactivate`.

## Features

What this extension is doing under the hood:

- run commands specified in `writerMode.executeOnActivate` while activating extension (by default activate zen mode)
- override vs code settings specified in `writerMode.overrideSettings`
  - by default:
    - increase font size to 20
    - disables VSCode rules
    - highlights current line
- run commands specified in `writerMode.executeOnDeactivate` whil deactivating extension (by default deactivate zen mode)

All those setting changes are first applied to workspace settings and in case of not having workspace extension will override global settings.

## Requirements

You need to have vs code version greater than 1.8 to activate zen mode.

## Known Issues

This extension is before version 1.0.0 so you may expect bugs.

## Release Notes

Please see [CHANGELOG](./CHANGELOG.md)

<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
