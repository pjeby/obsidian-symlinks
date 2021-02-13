const
    {Plugin, Notice, normalizePath, FileSystemAdapter} = require("obsidian"),
    platform = window.process.platform,
    shouldRecurse = (platform === "darwin" || platform === "win32")
;

async function reconcileFolderCreation(realPath, normalizedPath) {
    if ( (await this.fs.promises.lstat(this.getFullRealPath(realPath))).isSymbolicLink() ) {
        this.startWatchPath(realPath, shouldRecurse);
    }
    return await this.constructor.prototype.reconcileFolderCreation.call(this, realPath, normalizedPath);
}

async function listRecursiveChild(path, dirent) {
    const
        vaultPath = path ? `${path}/${dirent.name}` : dirent.name,
        realPath = this.getFullRealPath(vaultPath)
    ;
    if (dirent.isSymbolicLink() || (await this.fs.promises.lstat(realPath)).isSymbolicLink()) {
        const stat = await this.fs.promises.stat(realPath);  // Get the plain stat
        stat.name = dirent.name;  // Make it look like a dirent
        dirent = stat;
    }
    return await this.constructor.prototype.listRecursiveChild.call(this, path, dirent);
}

module.exports = class Symlinks extends Plugin {
    onload() {
        if (!(this.app.vault.adapter instanceof FileSystemAdapter)) {
            return new Notice("Symlinks only supported for filesystem-based vaults");
        }

        // Hotfix .reconcileFolderCreation and .listRecursiveChild -- note: list() is similarly broken!
        const adapter = this.app.vault.adapter;
        Object.assign(adapter, {listRecursiveChild, reconcileFolderCreation});
        this.register(() => { delete adapter.listRecursiveChild; delete adapter.reconcileFolderCreation; });

        // Force the adapter to rescan all dirs, looking for symlinks
        adapter.listRecursive("");
        walkAndRefresh(this.app.vault.getAbstractFileByPath("/").children);
        async function walkAndRefresh(items) {
            for (const item of items) {
                if (item.children) {
                    await adapter.listRecursive(item.path);
                    await walkAndRefresh(item.children);
                }
            }
        }
    }
}
