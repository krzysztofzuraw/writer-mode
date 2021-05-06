import * as vscode from "vscode";

type Setting = string | number | undefined | object;

const settingsToBringBack: Array<{
  key: string;
  setting: Setting;
}> = [];

export function activate(context: vscode.ExtensionContext) {
  const activateCommand = vscode.commands.registerCommand(
    "extension.writerModeOn",
    () => {
      vscode.window.showInformationMessage("Writer mode is on.");
      const settingsToOverride = vscode.workspace
        .getConfiguration("writerMode")
        .get<{ [key: string]: Setting }>("overrideSettings");

      if (settingsToOverride) {
        const isInsideWorkspace = vscode.workspace.workspaceFolders;
        const config = vscode.workspace.getConfiguration();
        Object.entries(settingsToOverride).map(([key, setting]) => {
          settingsToBringBack.push({ key, setting: config.get(key) });
          config.update(
            key,
            typeof setting === "object" ? { ...setting } : setting, // hack to unpack proxy
            isInsideWorkspace
              ? vscode.ConfigurationTarget.Workspace
              : vscode.ConfigurationTarget.Global
          );
        });
      }

      const commandsToExecute = vscode.workspace
        .getConfiguration("writerMode")
        .get<Array<string>>("executeOnActivate");

      if (commandsToExecute) {
        commandsToExecute.map((command) =>
          vscode.commands.executeCommand(command)
        );
      }
    }
  );
  const deactivateCommand = vscode.commands.registerCommand(
    "extension.writerModeOff",
    () => {
      // Display a message box to the user
      vscode.window.showInformationMessage("Writer mode is off.");

      if (settingsToBringBack) {
        const isInsideWorkspace = vscode.workspace.workspaceFolders;
        const config = vscode.workspace.getConfiguration();
        settingsToBringBack.map(({ key, setting }) =>
          config.update(
            key,
            setting,
            isInsideWorkspace
              ? vscode.ConfigurationTarget.Workspace
              : vscode.ConfigurationTarget.Global
          )
        );
      }

      const commandsToExecute = vscode.workspace
        .getConfiguration("writerMode")
        .get<Array<string>>("executeOnDeactivate");

      if (commandsToExecute) {
        commandsToExecute.map((command) =>
          vscode.commands.executeCommand(command)
        );
      }
    }
  );

  context.subscriptions.push(activateCommand, deactivateCommand);
}
