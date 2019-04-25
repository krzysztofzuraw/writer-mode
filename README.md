# writer-mode

Distraction free plain text editing in VSCode.

![Imgur](https://i.imgur.com/33zYvoE.gif)

To activate use `cmd+shift+p` and type: `Writer mode: Activate`.

Deactivating works the same way: `cmd+shift+p` and `Writer mode: Deactivate`.

## Features

What this extension is doing under the hood:

- activate zen mode
- increase font size to 20
- disables VSCode rules
- highlights current line: to enable set `writerMode.highlightCurrentLine` to `true` in vs code settings
- customize color of current line highlight by setting `writerMode.highlightBorderColor` to color in hex format - like `#fff`

All those setting changes are first applied to workspace settings and in
case of not having workspace extension will override global settings.

Deactivating of extension brings back old settings.

## Requirements

You need to have vs code version greater than 1.8 to activate zen mode.

## Known Issues

This extension is before version 1.0.0 so you may expect bugs.

## Release Notes

Please see [CHANGELOG](./CHANGELOG.md)
