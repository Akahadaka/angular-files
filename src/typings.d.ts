// Types from https://gist.github.com/screeny05/b1b7cbeb81479ece36dae21a9ee17d30

declare enum ChooseFileSystemEntriesType {
    'open-file',
    'save-file',
    'open-directory'
}

declare interface ChooseFileSystemEntriesOptionsAccepts {
    description?: string;
    mimeTypes?: string;
    extensions?: string;
}

declare interface ChooseFileSystemEntriesOptions {
    type?: ChooseFileSystemEntriesType;
    multiple?: boolean;
    accepts?: ChooseFileSystemEntriesOptionsAccepts[];
    excludeAcceptAllOption?: boolean;
}

declare interface FileSystemHandlePermissionDescriptor {
    writable?: boolean;
}

declare interface FileSystemCreateWriterOptions {
    keepExistingData?: boolean;
}

declare interface FileSystemGetFileOptions {
    create?: boolean;
}

declare interface FileSystemGetDirectoryOptions {
    create?: boolean;
}

declare interface FileSystemRemoveOptions {
    recursive?: boolean;
}

declare enum SystemDirectoryType {
    'sandbox'
}

declare interface GetSystemDirectoryOptions {
    type: SystemDirectoryType;
}

declare interface FileSystemWriter {
    write(position: number, data: BufferSource | Blob | string): Promise<void>;
    truncate(size: number): Promise<void>;
    close(): Promise<void>;
}

declare interface FileSystemWriterConstructor {
    new(): FileSystemWriter;
}

declare interface FileSystemHandle {
    isFile: Readonly<boolean>;
    isDirectory: Readonly<boolean>;
    name: Readonly<string>;
    queryPermission(descriptor?: FileSystemHandlePermissionDescriptor): Promise<PermissionState>;
    requestPermission(descriptor?: FileSystemHandlePermissionDescriptor): Promise<PermissionState>;
}

declare interface FileSystemHandleConstructor {
    new(): FileSystemHandle;
}

declare interface FileSystemFileHandle extends FileSystemHandle {
    getFile(): Promise<File>;
    createWriter(options?: FileSystemCreateWriterOptions): Promise<FileSystemWriter>;
}

declare interface FileSystemFileHandleConstructor {
    new(): FileSystemFileHandle;
}

declare interface FileSystemDirectoryHandle extends FileSystemHandle {
    getFile(name: string, options?: FileSystemGetFileOptions): Promise<FileSystemFileHandle>;
    getDirectory(name: string, options?: FileSystemGetDirectoryOptions): Promise<FileSystemDirectoryHandle>;
    getEntries(): AsyncIterable<FileSystemFileHandle | FileSystemDirectoryHandle>;
    removeEntry(name: string, options?: FileSystemRemoveOptions): Promise<void>;
}

declare interface FileSystemDirectoryHandleConstructor {
    new(): FileSystemDirectoryHandle;
    getSystemDirectory(options: GetSystemDirectoryOptions): Promise<FileSystemDirectoryHandle>;
}

declare interface Window {
    chooseFileSystemEntries(options?: ChooseFileSystemEntriesOptions): Promise<FileSystemHandle | FileSystemHandle[]>;
    FileSystemHandle: FileSystemHandleConstructor;
    FileSystemFileHandle: FileSystemFileHandleConstructor;
    FileSystemDirectoryHandle: FileSystemDirectoryHandleConstructor;
    FileSystemWriter: FileSystemWriterConstructor;
}