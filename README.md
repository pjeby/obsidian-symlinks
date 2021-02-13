# Basic Symlink Support for Obsidian

This plugin allows [Obsidian.md](https://Obsidian.md/) to follow directory symlinks inside a vault, and notice when changes are made to files in those directories, outside of Obsidian.

In principle, it should work on all desktop platforms, but has only been tested on Windows.  Feedback on its functioning on other platforms is appreciated.

### Installation

Clone this repository or unzip the latest release as a subdirectory of your vault's `.obsidian/plugins/` directory, then enable it in the Obsidian "Community Plugins" configuration page.  (You may need to click the refresh icon to get it to show up in the list.)

Once activated, there is no user interface, but any directory symlinks in the vault should be observable in the file manager, and any changes made to the directory or file contents made outside Obsidian should be reflected in real-time.

### Limitations

tl;dr: don't use this plugin unless you're *really* sure you know what you're doing, and are okay with losing data or settings in the event you were overconfident!

* This plugin is alpha software at the moment: back up your data!  (Inside the vault and out)

* This has not been tested with Obsidian sync, or *any other kind of sync*.  If the target of a symlink is itself a directory that's synced by a different Obsidian vault, you could (potentially) end up with sync conflicts or data loss.  Some sync tools (e.g. git) do not follow symlinks, but rather synchronize the *path* the symlink points to, which may produce undesired results if you share your vault with other people that way.

* Obsidian's file manager cannot move files across device boundaries, so if you symlink to a folder on a different drive from your vault, you will not be able to drag files between that folder and other folders using Obsidian's file explorer.  (You'll need to use your OS's explorer for such moves, and Obsidian will see the move as a deletion and the creation of a new file.  It will also *not* update any links that depended on the path of that file, nor will it remember anything it "knew" about the file before the move.)

* File symlinks *may* work with this plugin, but are not officially supported at this time.  It's unlikely that change events will be processed for symlinked files, meaning that if you change the file directly (rather than via the symlink), Obsidian may not detect the change, update search indexes, etc. etc.

* Symlinking to a target that is *inside* the same vault is likely to give you duplicate search results, among other issues.  So you probably don't want to do that.

* This plugin doesn't check for symlink loops (direct or indirect).  So if you link to a folder containing a link to a folder, etc., you run the risk of Obsidian trying to load infinite subdirectories, using up all your memory, crashing Obsidian, and maybe your computer along with it.  So *don't do that*.

* Symlinking things under the `.obsidian/` directory in order to share them between vaults is **a good way to corrupt your setttings**, unless you *really really* know what you're doing.

  Obsidian and its plugins tend to write JSON files without first checking to see if they've changed on disk, nor do they reload their settings even if they have changed.  So if you share a settings file between two vaults, it's likely that changes made in one will overwrite changes by the other, unless you close the vault you're not making changes in.

  This is less of a problem for CSS snippets, since you can't edit those directly in Obsidian anyway.  So creating a common folder for CSS snippets and symlinking it into your vaults is less of a problem...  assuming you're not doing any syncing, anyway.

After reading this list, you may wonder if you'd be better off just using another two-way sync tool to do whatever it was you wanted to do with symlinks.

The answer is, "yes, probably".  The main exceptions are when:

* Your vault is not being synced by any tool (including Obsidian itself), or you have confirmed that the way your synchronization tool handles symlinks does not create problems for you
* The vault and the symlinked-to directories are stored on the *same physical device* (and are both backed up regularly)
* You are only placing symlinks outside the vault's `.obsidian` folder (except perhaps for the `snippets` or `themes` folders), and all symlinks are pointing to *directories*, not files.

If your use case doesn't fit into those rules, you should probably use some sort of real-time folder sync tool, such as the Windows tools mentioned [here](https://superuser.com/questions/65524/how-do-i-synchronise-two-folders-in-real-time-in-windows-7), or a tool (such as [Unison](https://www.cis.upenn.edu/~bcpierce/unison/)) that works on all of Obsidian's desktop platforms and can be run continuously to keep files synchronized in real time.  (Though syncing stuff under `.obsidian` will still give you headaches, unless it's just `snippets` or `themes`, or you only edit settings from *one* vault and do so with other vaults closed.)