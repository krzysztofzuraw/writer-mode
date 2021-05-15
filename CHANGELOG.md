# Change Log

All notable changes to the "writer-mode" extension will be documented in this file.

## 0.1.0

- Initial release

## 0.2.0

- Add current line highlight

## 0.3.0

- total rewrite: now you have control what commands are activated and what gets overriden while
  activating extension:
  - `writerMode.executeOnActivate` setting controls which commands are executed on activation
  - `writerMode.executeOnDeactivate` setting controls which commands are executed on deactivation
  - `writerMode.overrideSettings` setting controls which vs code settings are overriden
