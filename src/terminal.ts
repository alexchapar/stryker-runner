import * as vscode from "vscode";

export const makeReusableTerminal = ({ name }: { name: string }) => {
  let terminal: vscode.Terminal | undefined;
  vscode.window.onDidCloseTerminal((t) => {
    if (terminal && t.processId === terminal.processId) {
      console.log(
        `Stryker Runner's reusable terminal (pid: ${terminal.processId}) was closed`
      );
      terminal = undefined;
    }
  });

  return () => {
    if (!terminal) {
      terminal = vscode.window.createTerminal(name);
      console.log(
        `Created a new reusable terminal for Stryker Runner with pid: ${terminal.processId}`
      );
    }
    console.log(
      `Reusing terminal for Stryker Runner with pid: ${terminal.processId}`
    );
    return terminal;
  };
};

export const runCommand = (terminal: vscode.Terminal) => (command: string) => {
  terminal.show();
  terminal.sendText(command);
};
