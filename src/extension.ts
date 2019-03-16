import * as vscode from "vscode";

const RULERS_SECTION = "editor.rulers";
const FONTSIZE_SECTION = "editor.fontSize";

export function activate(context: vscode.ExtensionContext) {
  const activateCommand = vscode.commands.registerCommand(
    "extension.writerModeOn",
    () => {
      // Display a message box to the user
      vscode.window.showInformationMessage("Writer mode is on.");
      // Activate zen mode
      vscode.commands.executeCommand("workbench.action.toggleZenMode");
      overrideSettings([], 20);
    }
  );
  const deactivateCommand = vscode.commands.registerCommand(
    "extension.writerModeOff",
    () => {
      // Display a message box to the user
      vscode.window.showInformationMessage("Writer mode is off.");
      vscode.commands.executeCommand("workbench.action.exitZenMode");
      overrideSettings(undefined, undefined);
    }
  );

  context.subscriptions.push(activateCommand, deactivateCommand);
}

function overrideSettings(rulersValue?: number[], fontSizeValue?: number) {
  const config = vscode.workspace.getConfiguration();

  if (vscode.workspace.workspaceFolders) {
    // Override default workspace settings
    config.update(
      RULERS_SECTION,
      rulersValue,
      vscode.ConfigurationTarget.Workspace
    );
    config.update(
      FONTSIZE_SECTION,
      fontSizeValue,
      vscode.ConfigurationTarget.Workspace
    );
  } else {
    // Override global settings
    config.update(
      RULERS_SECTION,
      rulersValue,
      vscode.ConfigurationTarget.Global
    );
    config.update(
      FONTSIZE_SECTION,
      fontSizeValue,
      vscode.ConfigurationTarget.Global
    );
  }
}
