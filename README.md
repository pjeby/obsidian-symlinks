# Basic Directory Symlink Support for Obsidian

This plugin allows [Obsidian.md](https://Obsidian.md/) to follow directory symlinks inside a vault, and notice when changes are made to files outside of Obsidian.

In principle, it should work on all desktop platforms, but has only been tested on Windows.  Feedback on its functioning on other platforms is appreciated.

### Installation

Clone this repository or unzip the latest release as a subdirectory of your vault's `.obsidian/plugins/` directory, then enable it in the Obsidian "Community Plugins" configuration page.  (You may need to click the refresh icon to get it to show up in the list.)

Once activated, there is no user interface, but any directory symlinks in the vault should be observable in the file manager, and any changes made to the directory or file contents made outside Obsidian should be reflected in real-time.

