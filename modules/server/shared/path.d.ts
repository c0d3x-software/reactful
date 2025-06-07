export {}

declare global {
   type IDirectory = keyof IProjectDirectory

   interface IPathBrowse {
      name: string;
      path: string;
      file: File;
      base: string;
   }

   interface IProjectDirectory {
      /** apis directory */
      apis: string;

      /** assets directory */
      assets: string;

      /** built directory (dist)  */
      builds: string;

      /** routes directory */
      routes: string;

      /** shared content diretory */
      shares: string;

      /** component directory */
      components: string;

      /** custom directives directory */
      directives: string;
   }

   interface ISystemDirectory extends IProjectDirectory {
      /** current project directory */
      cwd: IPath;

      /** npm builded project directory */
      npm: string;
   }

   interface IPathDynamic {
      /** inner folder */
      back: IPathDynamic;

      /** current path */
      path: string;

      /** folder or file name (without extension)  */
      name: string;

      /** capitalized file/folder name */
      Name: string;

      /** folder or file name (with extension) */
      last: string;

      /** route pathname (without protocol and domain) */
      route: RouteString;

      /** looking for an specific folder, moving to its upper folder until root '/' */
      backTo(name: string, retry?: number): string;

      /** list all file of current path */
      browser(): Promise<IPathBrowse[]>;

      /** resolving relative path syntax */
      resolve(path: string): Path;
   }

   interface IPathStatic extends ISystemDirectory {
      /** e2e test directory */
      e2e: boolean;

      /** get a current project directory   */
      from(directory: IDirectory): IPath

      /** initialize project paths */
      startup(): boolean
   }

   interface IPath {
      new(path: string): IPathDynamic;
      new(meta: ImportMeta): IPathDynamic;
   }
}