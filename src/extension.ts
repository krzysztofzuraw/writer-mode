import * as vscode from "vscode";

const RULERS_SECTION = "editor.rulers";
const FONTSIZE_SECTION = "editor.fontSize";
const LINE_HIGHLIGHT_SECTION = "editor.renderLineHighlight";
const COLOR_CUSTOMIZATION_SECTION = "workbench.colorCustomizations";

export function activate(context: vscode.ExtensionContext) {
  const activateCommand = vscode.commands.registerCommand(
    "extension.writerModeOn",
    () => {
      // Display a message box to the user
      vscode.window.showInformationMessage("Writer mode is on.");
      // Activate zen mode
      vscode.commands.executeCommand("workbench.action.toggleZenMode");
      const highlightColor = vscode.workspace
        .getConfiguration("writerMode")
        .get<string>("highlightBorderColor");
      overrideEditorSettings([], 20, "line", highlightColor);
    }
  );
  const deactivateCommand = vscode.commands.registerCommand(
    "extension.writerModeOff",
    () => {
      // Display a message box to the user
      vscode.window.showInformationMessage("Writer mode is off.");
      vscode.commands.executeCommand("workbench.action.exitZenMode");
      overrideEditorSettings(undefined, undefined, undefined, undefined);
    }
  );

  context.subscriptions.push(activateCommand, deactivateCommand);
}

function overrideEditorSettings(
  rulersValue?: number[],
  fontSizeValue?: number,
  lineHighlightValue?: string,
  colorHighlightBorder?: string
) {
  const config = vscode.workspace.getConfiguration();
  const isHighlightSettingOn = vscode.workspace
    .getConfiguration("writerMode")
    .get("highlightCurrentLine");

  const configObj: Array<{
    section: string;
    value: number[] | number | string | undefined | object;
  }> = [
    { section: RULERS_SECTION, value: rulersValue },
    { section: FONTSIZE_SECTION, value: fontSizeValue }
  ];

  if (isHighlightSettingOn) {
    configObj.push(
      {
        section: LINE_HIGHLIGHT_SECTION,
        value: lineHighlightValue
      },
      {
        section: COLOR_CUSTOMIZATION_SECTION,
        value: {
          "editor.lineHighlightBorder": colorHighlightBorder
        }
      }
    );
  }

  if (vscode.workspace.workspaceFolders) {
    // Override default workspace settings
    configObj.map(obj =>
      config.update(
        obj.section,
        obj.value,
        vscode.ConfigurationTarget.Workspace
      )
    );
  } else {
    // Override global settings
    configObj.map(obj =>
      config.update(obj.section, obj.value, vscode.ConfigurationTarget.Global)
    );
  }
}
